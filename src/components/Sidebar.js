import React from 'react'
import { Link } from 'react-router-dom'
import { IoMdPerson, IoIosList } from "react-icons/io";
import { MdOutlineRateReview } from "react-icons/md";
import { GiPodium } from "react-icons/gi";
import { AiFillHome } from "react-icons/ai";


function Sidebar() {
  return (
    <div className="flex">
    <div className="flex flex-col h-screen p-3 bg-white shadow w-">
        <div className="space-y-3">
            <div className="flex items-center">
                <h2 className="text-xl font-bold">Music Match</h2>
            </div>
            <div className="flex-1">
                <ul className="pt-2 pb-4 space-y-1 text-sm">
                    <li className="rounded-sm">
                        <a href="/" className="flex items-center p-2 space-x-3 rounded-md">
                            <AiFillHome></AiFillHome>
                            <span>Home</span>
                        </a>
                    </li>

                    <li className="rounded-sm">
                        <a href="/profile" className="flex items-center p-2 space-x-3 rounded-md">
                            <IoMdPerson></IoMdPerson>
                            <span>Profile</span>
                        </a>
                    </li>

                    <li className="rounded-sm">
                        <a href="/list" className="flex items-center p-2 space-x-3 rounded-md">
                            <IoIosList></IoIosList>
                            <span>Minha Lista</span>
                        </a>
                    </li>

                    <li className="rounded-sm">
                        <a href="/review" className="flex items-center p-2 space-x-3 rounded-md">
                            <MdOutlineRateReview></MdOutlineRateReview>
                            <span>Meus Reviews</span>
                        </a>
                    </li>

                    <li className="rounded-sm">
                        <a href="/ranking" className="flex items-center p-2 space-x-3 rounded-md">
                            <GiPodium></GiPodium>
                            <span>Ranking</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>
  )
}

export default Sidebar