import React from 'react';

const tabClassNames = {
	home: 'show',
	blog: 'show',
	help: 'show',
	code: 'show',
	about: 'show'
};

class ModulesShowCase extends React.Component {
	state = {
		selectedTab: 'home'
	}

	handleTabClick = (event) => {
		this.setState({
			selectedTab: event.target.id
		})
	}

	render() {
		const { selectedTab } = this.state;
		return (
			<div className="container">
				<div className="topic">CSS Vertical Tabs.</div>
				<div className="content">
					<input type="radio" name="slider" checked={selectedTab === 'home'} id="home" />
					<input type="radio" name="slider" checked={selectedTab === 'blog'} id="blog" />
					<input type="radio" name="slider" checked={selectedTab === 'help'} id="help" />
					<input type="radio" name="slider" checked={selectedTab === 'code'} id="code" />
					<input type="radio" name="slider" checked={selectedTab === 'about'} id="about" />
					<div className="list">
						<label htmlFor="home" id="home" className="home" onClick={this.handleTabClick}>
							<span className="title">Home</span>
						</label>
						<label htmlFor="blog" id="blog" className="blog" onClick={this.handleTabClick}>
							<span className="title">Blog</span>
						</label>
						<label htmlFor="help" id="help" className="help" onClick={this.handleTabClick}>
							<span className="title">Help</span>
						</label>
						<div className="slider"></div>
					</div>
					<div className="text-content">
						<div className={`home text ${this.state.selectedTab === 'home' ? 'show' : 'hidden'}`}>
							<div className="title">Home Content</div>
							<p>
								Super !
							</p>
						</div>
						<div className={`blog text ${this.state.selectedTab === 'blog' ? 'show' : 'hidden'}`}>
							<div className="title">Blog Content</div>
							<p>
								Super !
							</p>
						</div>
						<div className={`help text ${this.state.selectedTab === 'help' ? 'show' : 'hidden'}`}>
							<div className="title">help Content</div>
							<p>
								Super !
							</p>
						</div>
						<div className={`code text ${this.state.selectedTab === 'code' ? 'show' : 'hidden'}`}>
							<div className="title">code Content</div>
							<p>
								Super !
							</p>
						</div>
						<div className={`about text ${this.state.selectedTab === 'about' ? 'show' : 'hidden'}`}>
							<div className="title">about Content</div>
							<p>
								Super !
							</p>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
export default ModulesShowCase