"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function DragAndDrop() {
  const [sourceItems, setSourceItems] = useState([
    { id: "item-1", content: "Item 1", color: "bg-blue-200" },
    { id: "item-2", content: "Item 2", color: "bg-green-200" },
    { id: "item-3", content: "Item 3", color: "bg-yellow-200" },
    { id: "item-4", content: "Item 4", color: "bg-purple-200" },
    { id: "item-5", content: "Item 5", color: "bg-pink-200" },
  ]);

  const [targetItems, setTargetItems] = useState([]);
  const [draggingItem, setDraggingItem] = useState(null);

  const onDragStart = (item) => {
    setDraggingItem(item);
  };

  const onDragEnd = () => {
    if (!draggingItem) return;

    if (sourceItems.find((item) => item.id === draggingItem.id)) {
      const clonedItem = {
        ...draggingItem,
        id: `${draggingItem.id}-clone-${Date.now()}`,
      };
      setTargetItems([...targetItems, clonedItem]);
    } else if (targetItems.find((item) => item.id === draggingItem.id)) {
      setTargetItems(targetItems.filter((item) => item.id !== draggingItem.id));
    }

    setDraggingItem(null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <h1 className="text-2xl font-bold mb-8">Drag and Drop with Framer Motion</h1>

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Source container */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Source Items</h2>
          <div className="flex flex-wrap gap-2 min-h-[200px] border-2 border-dashed border-gray-200 p-4 rounded-lg">
            {sourceItems.map((item) => (
              <motion.div
                key={item.id}
                layoutId={item.id}
                drag
                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                onDragStart={() => onDragStart(item)}
                onDragEnd={onDragEnd}
                whileDrag={{ scale: 1.05, zIndex: 1 }}
                className={`${item.color} p-4 rounded-md shadow cursor-grab active:cursor-grabbing`}
              >
                {item.content}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Target container */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Drop Zone</h2>
          <div className="flex flex-wrap gap-2 min-h-[200px] border-2 border-dashed border-gray-300 p-4 rounded-lg bg-gray-50">
            {targetItems.map((item) => (
              <motion.div
                key={item.id}
                layoutId={item.id}
                drag
                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                onDragStart={() => onDragStart(item)}
                onDragEnd={onDragEnd}
                whileDrag={{ scale: 1.05, zIndex: 1 }}
                className={`${item.color} p-4 rounded-md shadow cursor-grab active:cursor-grabbing`}
              >
                {item.content}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 text-center text-gray-600">
        <p>Drag items between the containers</p>
      </div>
    </div>
  );
}
