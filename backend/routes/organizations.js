const express = require('express');
const router = express.Router();
const Organization = require('../models/organization');

router.post('/reg', async (req, res) => {
    let organization=new Organization({
        name:req.body.name,
        email_id:req.body.email,
        password:req.body.password,
        reg_no:req.body.regno,
        })
    
        organization=await organization.save();
        if(!organization)
        return res.status(400).send('Organization Cannot be created');
    
        res.send(organization);
  });

  router.put('/:id', async (req, res) => {
    try {
      const organizationId = req.params.id;
      const { desc, phone, upi } = req.body;
  
      // Find the organization by ID
      const organization = await Organization.findById(organizationId);
  
      if (!organization) {
        return res.status(404).json({ message: 'Organization not found' });
      }
  
      // Update the organization fields
      organization.description = desc;
      organization.Phone_no = phone;
      organization.upi_id = upi;
  
      // Save the updated organization
      const updatedOrganization = await organization.save();
  
      res.status(200).json(updatedOrganization);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  router.get('/fetchOrganization/:id', async (req, res) => {
    try {
      const { id } = req.params;
  
      // Find the organization by ID
      const organization = await Organization.findById(id);
  
      // If organization is not found, return an error
      if (!organization) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Return the organization's name
      res.status(200).json({ name: organization.name, email: organization.email_id, phone: organization.Phone_no});
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  });

  router.put('/update/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { name, email, phone,newPassword } = req.body;
  
      // Find the organization by ID
      const organization = await Organization.findById(id);
  
      if (!organization) {
        // organization not found
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Update the organization's name, email, and phone
      organization.name = name || organization.name;
      organization.email_id = email || organization.email_id;
      organization.Phone_no = phone || organization.Phone_no;
      if (newPassword) {
        organization.password = newPassword;
      }
      // Save the updated Organization to the database
      const updatedOrganization = await organization.save();
  
      // Return the updated organization object
      res.status(200).json(updatedOrganization);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  });
module.exports = router;