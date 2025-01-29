import express from 'express';
import cors from 'cors';
import connection from './db.js';
import speakeasy from 'speakeasy';
import { v4 as uuidv4 } from 'uuid';
import qrcode from 'qrcode';

const app = express();

app.use(cors());
app.use(express.json());

//fetching templates to api
/*app.get('/api/templates', async (req, res) => {
    const query = `
        SELECT t.template_id, t.template_name, t.is_visible, c.element_type, c.content, c.content_id, c.element_id
        FROM templates AS t
        inner JOIN template_content AS c ON t.template_id = c.template_id
        WHERE t.is_visible = TRUE    
    `;
    
    
    try { 
        const [result] = await connection.query(query);
        const templates = result.reduce((acc, row) => {
            const { template_id, template_name, is_visible, ...content } = row;
            const template = acc.find(t => t.template_id === template_id);

            if (template) {
                template.content.push(content);
            } else {
                acc.push({
                    template_id,
                    template_name,
                    is_visible,
                    content: [content]
                    
                });
            }

            return acc;
    },[]);
        res.json(templates);    
    }
    catch (err) {
        console.error('Error fetching templates:', err);
        res.status(500).json({ error: 'Database query error' });
    }
});*/
app.get('/api/templates', async (req, res) => {
  const query = `
      SELECT t.template_id, t.template_name, t.is_visible, c.element_type, c.content, c.content_id, c.element_id
      FROM templates AS t
      INNER JOIN template_content AS c ON t.template_id = c.template_id
  `;

  try {
      const [result] = await connection.query(query);
      const templates = result.reduce((acc, row) => {
          const { template_id, template_name, is_visible, ...content } = row;

          // Check if a template with the same template_id is already added
          let template = acc.find(t => t.template_id === template_id);

          if (is_visible) {
              // If visible, include full content
              if (template) {
                  template.content.push(content);
              } else {
                  acc.push({
                      template_id,
                      template_name,
                      is_visible,
                      content: [content],
                  });
              }
          } else {
              // If not visible, only include the template_name once
              if (!template) {
                  acc.push({ 
                    template_id,
                    template_name,
                    is_visible,
                    content: [],
                     });
              }
          }

          return acc;
      }, []);

      res.json(templates);
  } catch (err) {
      console.error('Error fetching templates:', err);
      res.status(500).json({ error: 'Database query error' });
  }
});



//hide template
app.post('/api/update', async (req, res) => {
    const { id, newValue, contentUpdates } = req.body;
    //console.log({id});
    //console.log({newValue});
    //console.log({contentUpdates});
    try {

      const [result] = await connection.execute(
        'UPDATE templates SET is_visible = ? WHERE template_id = ?',
        [newValue, id]
      );
  
      // Check if any rows were affected
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Template not found' });
      }
  
      res.json({ message: 'Update successful', result });
      
      for (const [elementId, content] of Object.entries(contentUpdates)) {
        await connection.execute(
            'UPDATE template_content SET content = ? WHERE template_id = ? AND element_id = ?',
            [content, id, elementId]
        );
    }
    } catch (error) {
      console.error('Error updating record:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  


  app.post('/api/register', async(req, res) =>{
    const { email, password } = req.body;
    const id = uuidv4();
    
    try{
      const [existingEmail] = await connection.execute('select email from users where email = ?',[email])
      if (existingEmail.length > 0){
        return res.json({message:'email already exists'})
      }

      const path = `user/${id}`;
      const secret = speakeasy.generateSecret();
      await connection.execute('insert into users(path,uid,secret,email,password) values(?, ?, ?, ?, ?)',
        [path,id,secret.base32,email,password]);

        const qrCode = await qrcode.toDataURL(secret.otpauth_url);

      res.json({qrCode,id,secret:secret.otpauth_url,email,scanMessage:'Scan the QR-code with authenticator app'})

    }
    catch(e){
      console.log(e);
    res.status(500).json({ message: 'Error generating secret key'})
    }
    
  });

  app.post("/api/verify", async(req,res) => {
    const { userId, token } = req.body;
      try {
        const [rows] = await connection.execute('SELECT secret FROM users WHERE uid = ?', [userId]);
        if (rows.length === 0) {
          return res.status(404).json({ message: 'User not found' });
        }
        const { secret } = rows[0];


      
      const verified = speakeasy.totp.verify({
        secret,
        encoding: 'base32',
        token
      });

      if (verified) {
        res.json({ verified: true });
      } else {
        res.status(400).json({ verified: false, message: 'Invalid 2FA token' });
      }
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: 'Error verifying token' });
    }
  });

  app.post("/api/user",async(req,res)=>{
    const {userId} = req.body;
    try {
      const[rows] = await connection.execute('select email, permission from users where uid = ?', [userId]);
      const user = rows[0];
      res.json({
        email: user.email,
        permission: user.permission
      });
    }
    
    catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error logging in' });
    }

  })

  

  // Login route
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists and password matches
    const [rows] = await connection.execute(
      'SELECT uid, email, password, secret FROM users WHERE email = ? AND password = ?',
      [email, password]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const user = rows[0];
    res.json({
      email: user.email,
      userId: user.uid, 
      requires2FA: true  
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error logging in' });
  }
});

app.get('/api/allusers',async(req,res)=>{
  try {
    const [users] = await connection.execute('SELECT id, email, password, permission FROM users');

    if(users.length === 0){
      return res.status(404).json({ message: 'No users found.' });
    }
    
    res.json(users);
  
  } catch (error) {
    console.log(error)
  }
})

app.post('/api/updateuser', async (req, res) => {
  const { updatedUsers } = req.body;
  try {
    for (const user of updatedUsers) {
      const { id, password, permission } = user;
      await connection.execute(
        'UPDATE users SET password = ?, permission = ? WHERE id = ?',
        [password, permission, id]
      );
    }
    
  } catch (error) {
    console.log('generic error')
  }
});

app.post('/api/deleteuser', async (req,res)=>{
  const {deleteId}= req.body;
  try{
     await connection.execute(
      'Delete from users where id=?',[deleteId]
    )
  }catch(err){ console.log('generic error')

  }
})

app.get('/api/order',async(req,res)=>{
  const [order] = await connection.execute(`select t_name, t_order from template_order`)
  res.json(order);
})


app.post('/api/updateOrder', async(req,res)=>{
  const {componentNames} =req.body;
  console.log(componentNames)
  try{
    await connection.execute(
     `
    UPDATE template_order
    SET \`t_order\` = CASE 
      ${componentNames.map((name, index) => `WHEN \`t_name\` = '${name}' THEN ${index + 1}`).join(' ')}
    END
    WHERE \`t_name\` IN (${componentNames.map(name => `'${name}'`).join(', ')});
  `,[componentNames]

    )
  }catch(err){ console.log('error')}
})


  

  
app.listen(8080,()=>{
console.log("server is running at 8080")
});