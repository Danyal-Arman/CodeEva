import React from 'react'
import { MessageCircleMore, Share2 } from 'lucide-react';
import { CodeBracketIcon , BoltIcon, ComputerDesktopIcon, ChatBubbleLeftRightIcon} from "@heroicons/react/24/outline";

const featuresData = [
    {
        id: 1,
        title: "Real-Time Collaboration",
        description: "Work together with others in real-time with instant code synchronization.",
        icon: <ChatBubbleLeftRightIcon className='w-5 h-5' />
    },
    {
        id: 2,
        title: "Code Sharing",
        description: "Easily share your code snippets with a link — no setup required.",
        icon: <Share2 className='w-5 h-5'/>,
    },
    {
        id: 3,
        title: "Multi-Language Support",
        description: "Write and execute code in multiple languages including JS, Python, and more.",
        icon: <CodeBracketIcon className='w-5 h-5'/>,
    },
    {
        id: 4,
        title: "Video Call",
        description: "Integrate video call for face-to-face collaboration.Discuss code changes in contact with integrated chat.",
        icon: <ComputerDesktopIcon className='w-5 h-5'/>,
    },
    {
        id: 5,
        title: "Built-in Chat",
        description: "Private rooms with access control to keep your sessions safe.",
        icon: <MessageCircleMore className='w-5 h-5'/>,
    },
    {
        id: 6,
        title: "AI Programming Assistant",
        description: "Private rooms with access control to keep your sessions safe.",
        icon: <BoltIcon className='w-5 h-5'/>,
    },
   
];


const FeatureItems = () => {
    return (
        <>
       {featuresData.map((feature)=> <div key={feature.id} className='p-4 bg-gray-800/70 rounded-xl shadow-xl transition transform duration-300 hover:scale-105'>
            <div className='flex flex-col gap-4'>
                <div className='w-fit bg-blue-400/10 text-blue-400 p-2 rounded-md'>
               <span className=''>{feature.icon}</span>
                </div>
                <div className='space-y-2'>
                    <h1 className='text-lg font-semibold'>{feature.title}</h1>
                    <p className='text-gray-400/80 '>{feature.description}</p>
                </div>
            </div>
        </div>)}
        </>
    )
}

export default FeatureItems
