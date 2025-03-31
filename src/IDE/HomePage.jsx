"use client"
import soliditySyntax from  './Syntax'
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Layout, Settings, PanelLeft, CircleX, Bot, Sparkles } from "lucide-react"
import Preview from "./Preview"
import { motion } from "framer-motion"
import ChatBot from './ChatBot'
import { useLocation } from 'react-router-dom'

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("components")
  const [openPreview, setOpenPreview] = useState(false);
  const [openAi, setOpenAi] = useState(false);
  const  location = useLocation()
  const data = location.state
  const [varName, setVarName]=useState('')
  const [code,  setCode] = useState(`
    // SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract MyContract {
    // State variable
    address public owner;
    uint256 public value;

    // Event
    event ValueUpdated(address indexed updater, uint256 newValue);

    // Modifier to restrict access
    modifier onlyOwner() {
        require(msg.sender == owner, "Not the contract owner");
        _;
    }

    // Constructor (runs once when deployed)
    constructor() {
        owner = msg.sender;
    }

    // Function to update value
    function updateValue(uint256 _newValue) public onlyOwner {
        value = _newValue;
        emit ValueUpdated(msg.sender, _newValue);
    }

    // Function to retrieve the contract balance
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
    //program begins

    // Function to receive ETH
    receive() external payable {}
}
`)

  // Convert the syntax items to include id and color properties
  const sourceItems = soliditySyntax.map((item, index) => ({
    ...item,
    id: `syntax-${index}`,
  }))

  const [targetItems, setTargetItems] = useState([])
  const [draggingItem, setDraggingItem] = useState(null)

  const onDragStart = (item) => {
    setDraggingItem(item)
  }
  const onDragEnd = (id) => {
    if (!draggingItem) return
    // If the item was in the source container, clone it to the target
    if (sourceItems.find((item) => item.id === draggingItem.id)) {
      const clonedItem = {
        ...draggingItem,
        id: `${draggingItem.id}-clone-${Date.now()}`,
      }
      setTargetItems([...targetItems, clonedItem])
      //map the through the code and get  the //program begins then add the draggingitem code there
      setCode((prevCode) => {
        const x = draggingItem
        return prevCode
          .split("\n")
          .map((line) =>
            //use regx to split the syntax
            line.includes("//program begins") ? `${line}\n  ${x.syntax}` : line
          )
          .join("\n");
      });
    }
    // If the item was in the target container, remove it
    else if (targetItems.find((item) => item.id === draggingItem.id)) {
      setTargetItems(targetItems.filter((item) => item.id !== draggingItem.id))
    }

  setDraggingItem(null)
  }
  const removeCodeBlock = (id) => {
    // Find the item with the given ID
    const x = targetItems.find(item => item.id === id);
  
    if (!x) return; // If item not found, exit function
  
    // Convert object to string
    let text_content = JSON.stringify(x);
  
    // Split text into words
    let words = text_content.split(' ');
    let startWord = words[0];  
    let lastWord = words[words.length - 1];
  
    // Remove the whole text from the first word to the last word
    let regex = new RegExp(`\\b${startWord}.*${lastWord}\\b`, "g");
    setCode(prevCode => prevCode.replace(regex, '').trim());
  
    // Delete from drop area
    setTargetItems(targetItems.filter(item => item.id !== id));
  };

  // Function to generate a random color based on index
  const deploy=()=>{
    const formdata  = code
    axios.post(`${api_enpoint}/deploy`, formdata).then(res=>{console.log('deploying');
      alert("deploying code")
    }).catch(
      err=>  console.log(err)
    )
  }



  return (
    <div className="flex flex-col h-screen bg-black text-white">
      {/* Header */}
      <header className="flex justify-between items-center p-4 border border-gray-700">
        <div className="text-lg font-medium flex gap-2 items-center"><Bot className="w-8 h-8 text-purple-500" />
        <span className="text-white font-medium text-xl">i-contract</span></div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={deploy}>
            deploy
          </Button>
          <Button variant="outline" size="sm" onClick={() => {setOpenPreview(!openPreview); setOpenAi(false)}}>
            Preview code
          </Button>
        </div>
      </header>

      {/* Main content */}
      <div className="flex overflow-hidden relative">
        {openAi &&(
          <ChatBot contract_code={code}/>
        )}
        {/* Tab list */}
        <div className="border-r border-l border-b border-gray-700 p-2">
          <Tabs value={activeTab} onValueChange={setActiveTab} orientation="vertical" className="h-full">
            <TabsList className="flex flex-col h-auto bg-transparent gap-1">
              <TabsTrigger value="components" className="w-full justify-start gap-2 data-[state=active]:bg-gray-800" onClick={()=>{setOpenAi(!openAi); setOpenPreview(false)}}>
                <Sparkles size={16} />
                AI assist
              </TabsTrigger>
              <TabsTrigger value="layers" className="w-full justify-start gap-2 data-[state=active]:bg-gray-800">
                <PanelLeft size={16} />
                Layers
              </TabsTrigger>
              <TabsTrigger value="settings" className="w-full justify-start gap-2 data-[state=active]:bg-gray-800">
                <Settings size={16} />
                Settings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="components" className="mt-4">
              <div className="text-sm text-gray-400 mb-2">Drag elements to canvas</div>
              <div className="flex flex-col gap-2 h-[90dvh] border-2 border-dashed border-gray-700 p-4 rounded-lg overflow-y-scroll">
                {sourceItems.map((item) => (
                  <motion.div
                    layoutId={item.id}
                    drag
                    dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                    onDragStart={() => onDragStart(item)}
                    onDragEnd={()=>onDragEnd(item.id)}
                    whileDrag={{ scale: 1.05, zIndex: 4, position: 'absolute' }}
                    style={{
                      zIndex: 2,
                    }}
                    className={`bg-gray-700 p-2 rounded-md shadow cursor-grab active:cursor-grabbing text-white text-sm `}
                  >
                    {item.name}
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="layers" className="mt-4">
              <div className="text-sm text-gray-400">No layers yet</div>
            </TabsContent>

            <TabsContent value="settings" className="mt-4">
              <div className="text-sm text-gray-400">Select an element to edit</div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Drop Zone */}
        <div className="flex-1 flex p-4">
          <div className="bg-gray-900 p-4 rounded-lg shadow-md w-full h-full overflow-y-scroll">
            <h2 className="text-lg font-semibold mb-4">Drop Zone</h2>
            <div className="flex flex-col gap-2 text-white  border-2 border-dashed border-gray-700 p-4 rounded-lg">
              {targetItems.map((item) => (
               
                <motion.div
                  key={item.id}
                  layoutId={item.id}
                  drag
                  dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                  whileDrag={{ scale: 1.05, zIndex: 1, position: 'absolute' }}
                  className={` p-2 w-[300px] text-white rounded-md shadow cursor-grab active:cursor-grabbing text-sm relative `}
                >
                   <div
                className='bg-gray-500 p-5 rounded-lg'
                key={item.id}>
                   <CircleX onClick={() => removeCodeBlock(item.id)} className='absolute top-0 left-0 text-gray-300 active:text-white'/>
                  {item.name} <br />
                <input type="text" placeholder='name' className='px-2 text-black rounded py-1' />
                </div>
                </motion.div>
              ))}
            </div>
          </div>
          {openPreview && <Preview  code={code} />}
        </div>

        {/* Preview Panel */}

      </div>
    </div>
  )
}



