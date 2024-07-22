import React ,{useState,useEffect} from "react";
import api from '../api/axios';
// import components
import Header from './Header';
import Projectcreate from './Projectcreate';
// import Taskcreate from './Taskcreate';
import ProjectList from './ProjectList';



const Home = () => {
    const [projectlist, setProjects] = useState([]);

  //Add project to the database
  const addprojecthandler = async (project) => {
    console.log(project);
    const response = await api.post("/Project-list/", project);
    setProjects([...projectlist,response.data]);
  };
  //Retreive projects from the database
  const RetreiveProjects = async () => {
    const response = await api.get("/Project-list/");
    return response.data;
  }
  useEffect(() => {
    const getAllProjects = async () => {
      const allProjects = await RetreiveProjects();
      if (allProjects) setProjects(allProjects);
    };
    getAllProjects();
  }, []);

    return (
      <div>
        <h2 className="ui center aligned icon header" style={{marginTop:"2rem"}} >
          <i className="circular book icon" ></i>
          Hatio ToDo App
        </h2>
        <Header />
        <Projectcreate addprojecthandler={addprojecthandler} />
        <ProjectList project={projectlist}/>
      </div>
    );
    }

export default Home;