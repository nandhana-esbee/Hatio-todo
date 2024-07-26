import React ,{useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { Octokit } from '@octokit/core';

const Projectcard = (props) => {

    const navigate = useNavigate();
    const pro = props.projects;
    const goToTodos = () => {
        navigate("/todo",{state:{pro}});
    }

    const deletecard = async () => {
        try{
            const response = await api.delete(`/api/Project-list/${pro.Project_id}/`);
            if(response.status === 204){
                console.log("Deleted successfully");
                window.location.reload()

            }
        }
        catch(err){
            console.log(err);
        }
    }
    const [todo,setTodo] = useState([]);
    useEffect( () =>{
      const getTodo = async () =>{
        const res = await api.get("/api/Todo-list/",{
                params: {
                  "Project_id": pro.Project_id,
                }});
        if(res.data) setTodo(res.data);
      };
      getTodo();
    },
    []

    );
    const count = todo.length;
    const truecount = todo.filter((todos) => todos.Status === true).length;  

    // const Exportgist = () =>{
    //     navigate("/sgist",{state:{todo}})
    // }

    //creating gist 
    const createGist = async () => {
        const octokit = new Octokit({
          auth: process.env.REACT_APP_GIT_TOKEN
        });
    
        const markdownContent = convertToGroupedMarkdown(todo);
        const filename = `${pro.title}.md`;
        console.log(markdownContent);
        try {
          const response = await octokit.request('POST /gists', {
            description: 'Project todo gist',
            public: false,
            files: {
              [filename]: {
                content: markdownContent
              }
            },
            headers: {
              'X-GitHub-Api-Version': '2022-11-28'
            }
          });
    
          alert('Gist created successfully!');
        } catch (error) {
          alert('Failed to create gist.');
        }
      };

      //markdown conversion
      const convertToGroupedMarkdown = (Todos) => {
        const completedTodos = Todos.filter(todooos => todooos.Status);
        const pendingTodos = Todos.filter(todooos => !todooos.Status);
      
        let markdownContent = '';
        markdownContent += `# ${pro.title}\n### summary: ${truecount}/${count} todos completed`
      
        if (pendingTodos.length > 0) {
          markdownContent += `\n\n## Pending\n`;
          pendingTodos.forEach(todooos => {
            markdownContent +=`- [ ] **${todooos.Description}**\n`;
          });
        }

        if (completedTodos.length > 0) {
            markdownContent += `## Completed\n`;
            completedTodos.forEach(todooos => {
              markdownContent +=`- [x] **${todooos.Description}**\n`;
            });
          }
      
        return markdownContent;
      };


    return (
        <div className="ui card" style={{width:"20.3rem"}}>
            <div className="content">
                <div className="header">{props.projects.title}</div>
                <div className="content" style={{fontFamily:"serif"}}>{truecount}/{count}</div>
            </div>
            <div className="extra content">
                <div className="ui three buttons">
                    <button className="ui basic green button" onClick={goToTodos}><i className="list ul icon"></i></button>
                    <button className="ui basic blue button" onClick={createGist}><i className="download icon"></i></button>
                    <button className="ui basic red button" onClick={deletecard}><i className="trash icon"></i></button>
                </div>
            </div>
        </div>
    );
}

export default Projectcard;