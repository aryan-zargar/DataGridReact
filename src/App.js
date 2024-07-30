
import React from "react";
import { IoMoon } from "react-icons/io5";
import { IoSunny } from "react-icons/io5";
import { IconContext } from "react-icons";
import './App.css'
import { BrowserRouter, Switch,Route } from "react-router-dom/cjs/react-router-dom.min";
import Table from "./components/table";
import routesStore from "./routesStore";
import { PiKanban } from "react-icons/pi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export function toastMessage(msg,isdark){
  const notify = () => toast(msg,{
      rtl:true,
      theme:isdark=='true'?'dark':'light'
    });
    notify()
}
function App() {
    
    const [dark, setDark] = React.useState((window.localStorage.getItem('dark')));
    // const notify = () => toast("سلام",{
    //   rtl:true,
    //   theme:dark=='true'?'dark':'light'
    // });
    // notify()
    
    if(dark == 'true'){
      document.body.classList.add("dark");
    }
    const darkModeHandler = () => {
        if(dark == 'true'){
          setDark('false')
          window.localStorage.setItem('dark','false')
          document.body.classList.remove("dark");
        }else if(dark == 'false'){
          setDark('true')
          window.localStorage.setItem('dark','true')
          document.body.classList.add("dark");
        }
        
    }

    return (
        <div className="  dark:bg-slate-800  duration-500 transition-all" >

            {/* <button className="float-end dark:text-white "  onClick={()=> darkModeHandler()}>
                {
                    
                    dark == 'true' && <IoSunny className="h-5 w-5" />
                }
                {
                    dark == 'false' && <IoMoon className="h-5 w-5"/>
                }
            </button> */}
            <BrowserRouter>
              <Switch>
                {routesStore.map(e=>{
                  return(
                    <Route path={e.path} >
                      <Table path={e.path} fields={e.fields} api={e.api} name={e.name} ></Table>
                    </Route>
                  )
                })}
              </Switch>
            </BrowserRouter>
            <ToastContainer></ToastContainer>
        </div>
    );
}

export default App;