import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import axios from "axios";

function SentEmails() {
    let [sentEmails, setSentEmails] = useState([]);
    const userEmail = sessionStorage.getItem("userEmail");

    useEffect(() => {
        axios(`https://gmail-clone-email-be.onrender.com/allSentEmails/${userEmail}`)
            .then((response) => {
                setSentEmails(response.data);
            });
    }, [sentEmails, userEmail]);

    return (
        <>
            <Navbar />
            <div style={{ marginTop: "30px" }}>
                <div className="row">
                    <Sidebar />
                    <div className="col border border-dark rounded" style={{ minHeight: "600px", marginRight: "40px" }} >
                        <div className="mt-2">
                            <i className="fs-5 fa-solid fa-arrow-rotate-right icon" title="Refresh"></i>
                        </div>
                        <h5 className="mt-2">Sent Emails</h5>
                        <div className="" style={{maxHeight: "510px", overflowY:'auto'}}>                        
                            {
                                sentEmails.map((e, i) => {
                                    return(
                                    <div key={i} className="row mt-3 mb-1 p-1 unreadMail rounded-3" style={{ marginLeft: "1px", marginRight: "1px" }}>
                                        <div className="col-1">
                                            <i className="fs-5 fa-regular fa-star icon" title="Star"></i>
                                            <i className="fs-5 fa-solid fa-tag ms-4 icon" title="Mark as Important"></i>
                                        </div>
                                        <div className="col icon" style={{ maxWidth: "100%", overflow: "auto" }}>
                                            <span>{e.emailSubject}</span> <span>{e.emailBody}</span>
                                        </div>
                                        <div className="col-1 ">
                                            <i className="fs-5 fa-regular fa-trash-can icon delete" title="Delete"></i>
                                            <i className="fs-5 ms-4 fa-regular fa-envelope-open icon" title="Mark as read"></i>
                                        </div>
                                    </div>
                                    )
                                })
                            }
                        </div>                     
                    </div>
                </div>
            </div>
        </>
    );
}

export default SentEmails;
