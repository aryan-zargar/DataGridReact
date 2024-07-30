import axios from "axios";
import React, { useEffect, useState } from "react";
import {} from "react-icons/ai";
import {
  FaPlusCircle,
  FaPencilAlt,
  FaTrash,
  FaCheck,
  FaCross,
  FaArrowLeft,
  FaArrowRight,
  FaPen,
  FaArrowUp,
  FaArrowDown,
  FaHandPointUp,
} from "react-icons/fa";
import Box from "@mui/material/Box";
import Autocomplete from '@mui/joy/Autocomplete';
import Modal from "@mui/material/Modal";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import { FaDeleteLeft } from "react-icons/fa6";
import { WindowSharp } from "@mui/icons-material";
import { toastMessage } from "../App";
import { toast, useToastContainer } from "react-toastify";
import { GiCrossMark } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
import _ from "lodash";
export default function Table(props) {
  const [dark, setDark] = React.useState(window.localStorage.getItem("dark"));
  var [isUpdate, setUpdate] = useState(false);
  var [updateId,setUpdateId] = useState('')
  var [data, setData] = useState([]);
  var [newFormData, SetFormData] = useState({});
  var [singleData, setSData] = useState({});
  var [paginationNumber, setPageNum] = useState(1);
  var [fullData, setFullData] = useState([]);
  var [dataLength, setFullDataLenght] = useState(0);
  var [ForeignKeyData,setkeyData] = useState({})
  var [ForeignKeyList,setKeyList] = useState({})
  var [isAdd,setAdd] = useState(false)
  var [isAscending,setAscending] = useState(false)
  var [isDescending,setDescending] = useState(false)
  var [isSorted,setSorted] = useState(false)
  var [sortingField,setSortingField] = useState('id')
  // var [ForeignKeyList]
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    SetFormData({});
    setUpdate(false);
    setSData({});
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  function sortData(field){
    if(isSorted == false){
      setSorted(true)
      setAscending(true)
      setSortingField(field)
      setFullData(_.orderBy(fullData,[field],['asc']))
    }
    else if(isSorted == true,isAscending == true&&isDescending == false){
      setSorted(true)
      setAscending(false)
      setDescending(true)
      setSortingField(field)
      setFullData(_.orderBy(fullData,[field],['desc']))
    }
    else if(isSorted == true,isAscending == false,isDescending == true){
      setSorted(false)
      setAscending(false)
      setDescending(false)
      setFullData(_.orderBy(fullData,['id'],['asc']))
    }
  }
  async function fetchData(api) {
    const GetData = (await axios.get(api)).data;
    setData(GetData);
    setFullDataLenght(GetData.lenght);
    console.warn('you are gonna go out for a walk')
  }

  async function fetchSingleData(api, id,e) {
    
    const GetData = (await axios.get(`${api}${id}`)).data;
    setSData(GetData);
    console.log(GetData)
    setUpdate(true);
    setUpdateId(id)
    e.preventDefault()
  }
  async function fetchKeyList(api,name,targetField){
    const GetData = (await axios.get(`${api}`)).data;
    for (let index = 0; index < GetData.length; index++) {
      const element = GetData[index];
      GetData[index].Id1 = GetData[index].id
      GetData[index].id = index+1
      GetData[index].label = element[targetField]
    }
    console.log(GetData,'awdawdawdawda wd')
    setKeyList({
      ...ForeignKeyList,
      [`${name}`]: GetData
    });
  }
  async function fetchKeyData(api,id,targetField,name){
    const GetData = (await axios.get(`${api}${id}`)).data
    setkeyData({
      ...ForeignKeyData,
      [`${name}${id}`]: GetData[targetField]
    });
    
  }
  async function postData(data, api) {
    await axios.post(api, data, {
      headers: {
        "Content-Type": "*/*",
      },
    });
    await fetchData(api);
    handleClose();
    SetFormData({});
    setAdd(false)
    toast("داده ثبت شد", {
      rtl: true,
      theme: localStorage.getItem("dark") == "true" ? "dark" : "light",
    });
    // window.location.pathname = props.path
  }
  async function postDataAndNew(data, api) {
    await axios.post(api, data, {
      headers: {
        "Content-Type": "*/*",
      },
    });
    await fetchData(api);
    handleClose();
    SetFormData({});
    toast("داده ثبت شد", {
      rtl: true,
      theme: localStorage.getItem("dark") == "true" ? "dark" : "light",
    });
    setTimeout(() => {
      handleOpen()
    }, 500);
  }
  async function EditData(api, id, data) {
    await axios.put(`${api}${id}`, data).then(() => {
      toast("رکورد با موفقیت تغییر یافت !", {
        rtl: true,
        theme: localStorage.getItem("dark") == "true" ? "dark" : "light",
      });
    });
    fetchData(api);
    setUpdate(false)
  }
  async function deleteData(api, id) {
    await axios.delete(`${api}${id}`);
    await fetchData(props.api);
    // window.location = "." + props.path;
  }
  
  async function setDataWithPagination() {
    var ExportData = [];
    for (
      let index = (paginationNumber - 1) * 10;
      index < paginationNumber * 10;
      index++
    ) {
      const element = data[index];
      if (element != undefined) {
        ExportData.push(element);
      }
    }
    await setFullData(ExportData);
  }
  useEffect(() => {
    fetchData(props.api);
  }, []);
  function changePaginationNum(num) {
    setPageNum(Number(num));
    setDataWithPagination();
  }
  function nextButtonCondition() {
    var len = data.length;
    if (((paginationNumber + 1) * 10)-9 > len) {
      return true;
    } else {
      return false;
    }
  }

  useEffect(() => {
    setDataWithPagination();
  }, [data, paginationNumber]);
  return (
    <div className=" dark:bg-slate-800" >
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className=""
      >
        <Box className="dark:bg-gray-800 rounded-lg w-[50vw]" sx={style}>
          <div className="flex justify-center dark:text-white ">
            <h3 className="text-xl">{props.name} جدید </h3>
          </div>
          <div className="grid grid-cols-2 mt-5" dir="rtl">
            {props.fields.map((e) => {
              if (e.pk != true) {
                return (
                  <Input
                    className="col-span-1 dark:bg-gray-900 dark:text-white m-2"
                    color="neutral"
                    placeholder={e.titleFa}
                    onChange={(ev) => {
                      if (isUpdate != true) {
                        newFormData[e.title] = ev.target.value;
                        if (e.type == "number") {
                          newFormData[e.title] = Number(ev.target.value);
                        }
                      } else {
                        singleData[e.title] = ev.target.value;
                        if (e.type == "number") {
                          singleData[e.title] = Number(ev.target.value);
                        }
                      }
                    }}
                    type={e.type}
                    defaultValue={isUpdate ? singleData[e.title] : null}
                    min="0"
                    dir="rtl"
                    size="lg"
                    variant="soft"
                    
                  />
                );
              }
            })}
          </div>
          <div className="w-full flex justify-evenly mt-3">
            <Button
              color="danger"
              disabled={false}
              loading={false}
              required
              onClick={() => handleClose()}
              size="md"
              variant="solid"
              className="w-32  outline-gray-800"
            >
              <p className="text-base">لغو</p>
            </Button>
            <Button
              color="success"
              disabled={false}
              loading={false}
              onClick={() =>
                isUpdate
                  ? EditData(props.api, singleData.id, singleData)
                  : postData(newFormData, props.api)
              }
              size="md"
              variant="solid"
              className="w-32"
            >
              <p className="text-base">ثبت</p>
            </Button>
            {isUpdate ? (
              ""
            ) : (
              <Button
                color={isUpdate == true ? "warning" : "primary"}
                className="w-32"
                size="md"
                variant="solid"
                onClick={() => {
                  SetFormData({});
                  postDataAndNew(newFormData, props.api);
                }}
              >
                <p className="text-base">ثبت و جدید</p>
              </Button>
            )}
          </div>
        </Box>
      </Modal>
      
      <div className='flex justify-center w-screen'>

      <div dir="rtl" className="  mt-5 ">
        <Button onClick={()=>isUpdate!=true?setAdd(true):''} color="success" className="h-6 " variant="solid" >
          <FaPlusCircle
                
                className="cursor-pointer w-4 h-4   text-white"
          />
          <p className="mx-2 mb-1 " >{props.name} جدید</p>
        </Button> 
        <div
          dir="rtl"
          className="relative overflow-x-auto shadow-md w-fit mt-3 rounded-lg"
        >
          
          <table className="w-full text-base text-left scroll-container  rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-sm text-gray-700 uppercase  bg-gray-200 dark:bg-gray-900 dark:text-gray-300">
              <tr className="mx-5">
                {props.fields.map((e) => {
                  if (e.pk != true) {
                    return (
                      <th onClick={()=>sortData(e.title)} className={` py-3 ${fullData.length == 0?'px-4':''}  cursor-pointer`}>
                        
                        <p  className="mx-auto flex  text-sm w-fit">
                          <FaArrowUp className={`${isAscending == true && sortingField == e.title?'':'hidden'}`} />
                          <FaArrowDown className={`${isAscending == false && isDescending == true && sortingField == e.title?'':'hidden'}`} />
                          {e.titleFa}
                        </p>
                      </th>
                    );
                  }
                })}
                <th className="px-5">-</th>
              </tr>
            </thead>
            
            <tbody className="max-h-72" >
              
              {fullData.map((e) => {
                return (
                  <tr className="  odd:bg-white duration-500 transition-all dark:hover:bg-blue-600 hover:bg-blue-300 odd:dark:bg-gray-800 even:bg-gray-50 even:dark:bg-gray-700 border-b dark:border-gray-700 px-10 ">
                    {props.fields.map((a) => {
                      if (a.pk != true) {
                        function numberWithCommas(x) {
                          return x
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                        }
                        function numberWithSpace(x) {
                          var StringList = [...x];
                          if (StringList[4] != " " && StringList[8] != " ") {
                            StringList.splice(4, 0, " ");
                            StringList.splice(8, 0, " ");
                          }
                          var ReAssembledString = "";
                          StringList.forEach((element) => {
                            ReAssembledString = ReAssembledString + element;
                          });
                          return ReAssembledString;
                        }
                        
                        var endvalue = e[a.title]

                        if (typeof e[a.title] == "number") {
                          endvalue = numberWithCommas(String(e[a.title]));
                        } else if (a.type == "phone") {
                          endvalue = numberWithSpace(String(e[a.title]));
                        }
                        
                        
                        if (a.type == "boolean") {
                          return (
                            <td
                              scope="row"
                              dir="ltr"
                              className="cursor-pointer px-6 py-3 font-sm text-gray-900 whitespace-nowrap dark:text-white w-[140px]"
                            >
                              <p className="flex justify-center">
                                {endvalue === true ? (
                                  <FaCheck color="green" />
                                ) : (
                                  <RxCross1 className=" text-red-500" />
                                )}
                              </p>
                            </td>
                          );
                        }
                        else if(a.type == 'key'){
                          var defvalue
                          if(ForeignKeyData[`${a.title}${e[a.title]}`] == undefined){
                            fetchKeyData(a.keyapi,e[a.title],a.targetField,a.title)
                          }
                          if (isUpdate === true && updateId === e['id']){
                            newFormData[a.title] = e[a.title]
                            if(ForeignKeyList[a.title] == undefined){
                              fetchKeyList(a.keyapi,a.title,a.targetField)
                            }
                          
                            else{
                              defvalue = ForeignKeyList[a.title][0]
                              return(
                                <td
                              scope="row"
                              dir="ltr"
                              className="cursor-pointer px-6 py-3 font-sm text-gray-900 whitespace-nowrap dark:text-white w-[140px]"
                              >
                                <Autocomplete
                                  placeholder={a.titleFa}
                                  options={ForeignKeyList[a.title]}
                                  color="primary"
                                  disabled={false}
                                  size="sm"
                                  dir='rtl'
                                  onChange={(event, newValue) => {
                                    console.log(newValue)
                                    if (newValue != null && newValue != undefined){
                                      newFormData[a.title] = (newValue.Id1);
                                    }else{
                                      newFormData[a.title] = ''
                                    }
                                  }}
                                  defaultValue={{label:ForeignKeyData[`${a.title}${e[a.title]}`],id:1,Id1:e[a.title]}}
                                  variant="outlined"
                                  className="dark:bg-slate-700 dark:text-white" 
                                  // defaultValue={ForeignKeyData[`${a.title}${e[a.title]}`]}
                                />                                                         
                              </td>
                              )
                            }
                              
                            
                          }
                          return (
                            <td
                            scope="row"
                            dir="ltr"

                            className="cursor-pointer px-6 py-3 font-xs text-sm text-gray-900 whitespace-nowrap dark:text-white w-[140px]"
                          >
                            <p className="flex justify-center">{ForeignKeyData[`${a.title}${e[a.title]}`]}</p>
                          </td>
                          )
                          
                        }
                        else if (isUpdate === true && updateId === e['id']){
                          console.log(props.fields)
                          console.log(a)
                          
                          newFormData[a.title] = singleData[a.title]
                          return (
                            <td
                            scope="row"
                            dir="ltr"
                            className="cursor-pointer px-6 py-3 font-sm text-gray-900 whitespace-nowrap dark:text-white w-[140px]"
                            >
                              <Input
                                color="primary"
                                disabled={false}
                                placeholder=""
                                size="sm"
                                dir='rtl'
                                type={a.type}
                                onChange={(e)=>newFormData[a.title] = e.target.value}
                                variant="outlined"
                                defaultValue={a.type !== 'number'?e[a.title]:Number(e[a.title])}
                                className="dark:bg-slate-700 dark:text-white"
                              />                              
                            </td>
                          )
                        }
                        else {return (
                          <td
                            scope="row"
                            dir="ltr"

                            className="cursor-pointer px-6 py-3 font-xs text-sm text-gray-900 whitespace-nowrap dark:text-white w-[140px]"
                          >
                            <p className="flex justify-center">{endvalue}</p>
                          </td>
                        );}
                      }
                    })}
                    <td
                      
                      className="px-5 "
                    >
                      {isUpdate === true && updateId === e.id?
                      <div  ><FaCheck className='cursor-pointer text-green-700 float-end'  onClick={()=>EditData(props.api,e.id,newFormData)} /><RxCross1 onClick={()=>setUpdate(false)} className="text-red-500 text-base cursor-pointer float-start mx-1 " /></div>
                      :
                      <>
                      <FaTrash
                        onClick={() => {
                          if(isAdd!=true){
                            deleteData(props.api, e.id);
                          }
                        }}
                        className="text-red-500 text-sm cursor-pointer float-start mx-1"
                      />
                      <FaPen
                        onClick={(aa) => {
                          if(isAdd!=true){
                            fetchSingleData(props.api, e.id,aa)
                          }
                        }}
                      className="text-yellow-500 text-sm cursor-pointer float-end mx-1"
                      />
                      </>
                      }
                      
                    </td>
                  </tr>
                );
              })}
              {isAdd == true?<tr className={` odd:bg-white duration-500 transition-all dark:hover:bg-blue-600 hover:bg-blue-300 odd:dark:bg-gray-800 even:bg-gray-50 even:dark:bg-gray-700 border-b dark:border-gray-700 px-10 `}>
                   {props.fields.map((e)=>{
                    if(!e.pk==true){
                      if (e.type == 'key'){
                        if(ForeignKeyList[e.title] == undefined){
                          fetchKeyList(e.keyapi,e.title,e.targetField)
                        }
                          return(
                            <td
                          scope="row"
                          dir="ltr"
                          className="cursor-pointer px-6 py-3 font-sm text-gray-900 whitespace-nowrap dark:text-white w-[140px]"
                          >
                            <Autocomplete
                              placeholder={e.titleFa}
                              options={ForeignKeyList[e.title]}
                              color="primary"
                              disabled={false}
                              size="sm"
                              dir='rtl'
                              onChange={(event, newValue) => {
                                console.log(newValue)
                                if (newValue!= null){
                                  newFormData[e.title] = (newValue.Id1);
                                }else{
                                  newFormData[e.title] = ''
                                }
                              }}
                              variant="outlined"
                              className="dark:bg-slate-700 dark:text-white w-32" 
                              // defaultValue={ForeignKeyData[`${a.title}${e[a.title]}`]}
                            />                                                         
                          </td>
                          )
                        
                      }
                    return(
                      <td
                            scope="row"
                            dir="ltr"
                            className="cursor-pointer px-6 py-3 font-sm text-gray-900 whitespace-nowrap dark:text-white w-[100px]"
                            >
                              <Input
                                color="primary"
                                disabled={false}
                                placeholder=""
                                size="sm"
                                dir='rtl'
                                type={e.type}
                                onChange={(ev)=>{
                                  newFormData[e.title] = ev.target.value;
                                  if (e.type == "number") {
                                    newFormData[e.title] = Number(ev.target.value);
                                  }         
                                }}
                                variant="outlined"
                                className="dark:bg-slate-700 dark:text-white w-32"
                              />                              
                            </td>
                    )
                  }
                   })}
                   <td className="px-5 " >
                    {/* <div > */}
                    <FaCheck onClick={()=>postData(newFormData,props.api)} className='cursor-pointer text-green-700 float-end'  />
                    <RxCross1 onClick={()=>setAdd(false)} className="text-red-500 text-base cursor-pointer float-start mx-1 " />
                    {/* </div> */}
                   </td>
              </tr>:''}
            </tbody>
          </table>
          {fullData.length == 0 && isAdd != true?
              <div className="w-full flex justify-center py-10 text-gray-500" >
                  هیچ داده ای برای نمایش وجود ندارد
              </div>
              :''}  
        </div>
      </div>  
      </div>
      <div className="w-screen flex justify-center mt-5">
        <div className="flex justify-between w-[10vw]">
          {/* <p className='flex' ><FaArrowLeft className="mt-1" />قبلی</p>
           */}
          <Button
            variant="plain"
            disabled={paginationNumber == 1 ? true : false}
            onClick={() => changePaginationNum(paginationNumber - 1)}
          >
            <FaArrowLeft />
          </Button>
          <p className="mt-2 dark:text-white">{paginationNumber}</p>
          <Button
            variant="plain"
            disabled={nextButtonCondition()}
            onClick={() => changePaginationNum(paginationNumber + 1)}
          >
            <FaArrowRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
