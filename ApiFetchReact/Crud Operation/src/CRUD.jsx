import React, { useState, useEffect, Fragment } from "react";
import Table from "react-bootstrap/Table";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import axios from "axios";
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CRUD = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

const [name,setName]=useState('')
const [price,setPrice]=useState('')

const[editId,setEditId]=useState();
const [editName,setEditName]=useState('')
const [editPrice,setEditPrice]=useState('')

  const branddata = [
    {
      id: 1,
      name: "Sarfaraz",
      price: 2000,
    },
    {
      id: 2,
      name: "Sohan",
      price: 3000,
    },
    {
      id: 3,
      name: "Abit",
      price: 4000,
    },
  ]

  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  //example of promise

  // const getData=()=>{
  //   axios.get('https://localhost:7174/api/Brand')
  //   .then((result)=>{
  //     setData(result.data)
  //   })
  //   .catch((error)=>{
  //     console.log(error)
  //   })
  // }
  const getData=async()=>{
    try {
      const result = await axios.get(`https://localhost:7174/api/Brand`);
      setData(result.data);
      
    } catch (error) {
      console.log(error);
    }
    
  }

  const handleEdit=async(id)=>{
    handleShow();
    const result=await axios.get(`https://localhost:7174/api/Brand/${id}`)
    setEditName(result.data.brandName);
    setEditPrice(result.data.brandPrice);
    setEditId(id);
  }
  const handleDelete=async(id)=>{
    if(window.confirm("Are you sure you want to delete this brand?")===true){
      const result=await axios.delete(`https://localhost:7174/api/Brand/${id}`)
      if(result.status==200){
        toast.success('Brand has been Deleted Successfully');
        getData();
      }
    }
  }
  const handleUpdate=async()=>{
    const url=`https://localhost:7174/api/Brand/${editId}`;
    const data={
      "brandId":editId,
      "brandName": editName,
      "brandPrice": editPrice
    }
    const result=await axios.put(url,data)
  console.log(result);
  handleClose();
  getData();
  clear();
  toast.success('Brand has been updated Successfully');
  }

const handleSave=async()=>{
  const url=`https://localhost:7174/api/Brand`;
  const data={
    "brandName": name,
    "brandPrice": price
  }
  const result=await axios.post(url,data)
  console.log(result);
  getData();
  clear();
  toast.success('Brand has been added');

}
const clear=()=>{
  setName('');
  setPrice('');
  setEditName('');
  setEditPrice('');
  setEditId('');
}

  return (
    <Fragment>
      <ToastContainer/>
    <Container>
      <Row>
        <Col>
          <input type="text" className="form-control" placeholder="Enter Brand Name" 
          value={name} onChange={(e)=>setName(e.target.value)}/>
        </Col>
        <Col>        
          <input type="number" className="form-control" placeholder="Enter Brand Price" 
          value={price} onChange={(e)=>setPrice(e.target.value)}/>
        </Col>
        <Col>
          <button className="btn btn-primary" onClick={()=>handleSave()}>Add</button>
        </Col>
      </Row>
    </Container>
    <br></br>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Brand Name</th>
            <th>Brand Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0
            ? data.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.brandName}</td>
                    <td>{item.brandPrice}</td>
                    <td colSpan={2}>
                      <button className="btn btn-primary" onClick={()=>handleEdit(item.brandId)}>Edit</button> &nbsp;
                      <button className="btn btn-danger" onClick={()=>handleDelete(item.brandId)}>Delete</button>
                    </td>
                  </tr>
                );
              })
            : "Loading..."}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modify /Update Brand</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Row>
        <Col>
          <input type="text" className="form-control" placeholder="Enter Brand Name" 
          value={editName} onChange={(e)=>setEditName(e.target.value)}/>
        </Col>
        <Col>        
          <input type="number" className="form-control" placeholder="Enter Brand Price" 
          value={editPrice} onChange={(e)=>setEditPrice(e.target.value)}/>
        </Col>
      </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default CRUD;
