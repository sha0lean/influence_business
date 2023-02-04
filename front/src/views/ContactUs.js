import React from 'react'
import "../assets/scss/pages/profiles"

function ContactUs() {
	return (
		<div class="container">
			<div class="content">
				<div class="image-box">
					<img src="contact.png" alt="" />
				</div>
				<form action="#">
					<div class="topic">Send us a message</div>
					<div class="input-box">
						<input type="text" required />
						<label>Enter your name</label>
					</div>
					<div class="input-box">
						<input type="text" required />
						<label>Enter your email</label>
					</div>
					<div class="message-box">
						<label>Enter your message</label>
					</div>
					<div class="input-box">
						<input type="submit" value="Send Message" />
					</div>
				</form>
			</div>
		</div>
	)
}

export default ContactUs