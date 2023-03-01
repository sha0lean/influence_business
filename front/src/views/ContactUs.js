import React from "react";
import "../assets/scss/pages/profiles";

function ContactUs() {
    return (
        <div className="container">
            <div className="content">
                <div className="image-box">
                    <img src="contact.png" alt="" />
                </div>
                <form action="#">
                    <div className="topic">Send us a message</div>
                    <div className="input-box">
                        <input type="text" required />
                        <label>Enter your name</label>
                    </div>
                    <div className="input-box">
                        <input type="text" required />
                        <label>Enter your email</label>
                    </div>
                    <div className="message-box">
                        <label>Enter your message</label>
                    </div>
                    <div className="input-box">
                        <input type="submit" value="Send Message" />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ContactUs;
