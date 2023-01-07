import React from "react";
import "../assets/scss/layout/footer.scss";

function Footer() {
	return (
		<footer>
			<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
			<div class="top_header">
				<section>
					<span><i class="fa fa-map-marker"></i></span>
					<span>4 Avenue industrielle,  Acacias, Genève 1227, CH</span>
				</section>
				<section>
					<span><i class="fa fa-phone"></i></span>
					<span>+41 78 735 88 41</span>
				</section>
				<section>
					<span><i class="fa fa-envelope"></i></span>
					<span>info@influencerbusiness.ch</span>
				</section>
			</div>
			<span class="border-shape"></span>
			<div class="bottom_content">
				<section>
					<a href="/fb"><i class="fa fa-facebook"></i></a>
					<a href="/ig"><i class="fa fa-instagram"></i></a>
					<a href="/tw"><i class="fa fa-twitter"></i></a>
					<a href="/tg"><i class="fa fa-telegram"></i></a>
				</section>
				<section>
					<a href="/">Home</a>
					<a href="/about">About us</a>
					<a href="/contact">Contact</a>
				</section>
			</div>
			<div class="copyright">
				Copyright © 2021 Influenceur Business — All rights reserved
			</div>
		</footer>
	)
}
export default Footer;