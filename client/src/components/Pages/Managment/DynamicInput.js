
import React, {Component} from "react";
import "./DynamicInput.css";
class ListOfQuestions extends Component {
	state = {
	  size: [],
	  color: [],
	  page: true,
	  gender: []
	}

	getGenderValue=(e)=>{
		e.preventDefault()
		this.setState({gender: [...this.state.gender, e.target.value]})
	}

	previousPage = ()=>{
		this.setState({page: true})
	}

	nexPage = ()=>{
		this.setState({page: false})
	}

  
	handleSizeText = i => e => {
	  let size = [...this.state.size]
	  size[i] = e.target.value
	  this.setState({
		size
	  })
	}
  
	handleDeleteSise = i => e => {
	  e.preventDefault()
	  let size = [
		...this.state.size.slice(0, i),
		...this.state.size.slice(i + 1)
	  ]
	  this.setState({
		size
	  })
	}
  
	addSise = e => {
	  e.preventDefault()
	  let size = this.state.size.concat([''])
	  this.setState({
		size
	  })
	  console.log(this.state.size)
	}
  
	render() {

	
	  return (

		  <div style={{textAlign:"center", padding:"100px"}}>

				  <button value="females" onClick={this.getGenderValue}>Females</button>
				  <button value="mens" onClick={this.getArgetValue}>Mens</button>
				  <button value="xied gender" onClick={this.getArgetValue}>Mixed</button>
				  <button value="xied gender" onClick={()=> console.log(this.state.gender)}>SEE GENDER</button>




		  	{/* { this.state.page ? <Fragment>
				<label style={{color:"#000"}}>Add Size</label>
				<br/>
				{this.state.size.map((question, index) => (
					<span key={index}>
					<input
						style={{width:'50px', textAlign:"center", color:"#6351ce"}}
						type="text"
						onChange={this.handleSizeText(index)}
						value={question}
					/>
					<button onClick={this.handleDeleteSise(index)}>X</button>
					</span>
				))}
				<button style={{width:"30px"}} onClick={this.addSise}><span style={{fontSize:"25px"}}>+</span></button>
				<hr/>
				<button onClick={this.nexPage}> Next Page </button>
				</Fragment> :

				<div>
					<h1> Page 2 </h1>
					<button onClick={this.previousPage}>Previous</button>
				</div>
			} */}
				
		</div>
	  )
	}
  }

  export default ListOfQuestions;


// import React, {Component} from "react";


// import {TransitionGroup }  from "react-transition-group";
// class UserGeneratedPills extends Component {
// 	constructor() {
// 		super();
// 		this.handleFocus = this.handleFocus.bind(this);
// 		this.handleChange = this.handleChange.bind(this);
// 		this.handleKeypress = this.handleKeypress.bind(this);
// 		this.handleBlur = this.handleBlur.bind(this);
// 		this.handleClick = this.handleClick.bind(this);

// 		this.helperspan = null; // is set via ref
		
// 		this.state = {
// 			currentcolor: [
// 				"#531CB3",
// 				"#7149EE",
// 				"#B754FF",
// 				"#ED4FEF",
// 				"#ED49AB",
// 				"#ED4FEF",
// 				"#B754FF",
// 				"#7149EE"
// 			],
// 			content_add: "add +",
// 			width: 100,
// 			myItems: [],
// 		};
// 		this.lastId = -1;
// 	}


// 	handleFocus(event) {
// 		this.setState({ content_add: "" });
// 	}
	
// 	handleChange(event) {
// 		const usr_input = event.target.value;
// 		this.setState({ content_add: usr_input });
// 	}

// 	handleKeypress(event) {
// 		if (event.key === "Enter") {
// 			var newArray = this.state.myItems;
// 			var currentcontent = this.state.content_add.trim();
// 			if (!currentcontent) {
// 				return; 
// 			}
			
// 			var currentWidth = this.helperspan.offsetWidth;
// 			newArray.push({
// 				content: currentcontent, 
// 				id: ++this.lastId, 
// 				itemWidth: currentWidth + 2
// 			});
// 			this.setState({
// 				myItems: newArray,
// 				content_add: "",
// 			});
// 		}
// 	}

// 	handleBlur(event) {
// 		this.setState({ content_add: "add +" });
// 	}

// 	handleClick(event) {
// 		const idToRemove = Number(event.target.dataset["item"]);
// 		const newArray = this.state.myItems.filter((listitem) => {return listitem.id !== idToRemove});
// 		this.setState({ myItems: newArray });
// 		// console.log(this.state.myItems)
// 	}
	
	

// 	// componentDidUpdate(prevProps, prevState) {
// 	// 	if (prevState.content_add !== this.state.content_add) {
// 	// 		console.log('did update, content:', this.helperspan.textContent)
// 	// 		const helperWidth = this.helperspan.offsetWidth;
// 	// 		this.setState({ width: Math.max(50, helperWidth + 1) });
// 	// 	}
// 	// }

// 	makeAddedList() {
		
// 		const elements =  this.state.myItems.map((listitem, index) => (
// 			<li
// 				key={listitem.id}
// 				onClick={this.handleClick}
// 				data-item={listitem.id}
// 				style={{
// 					backgroundColor: this.state.currentcolor[
// 						index % this.state.currentcolor.length
// 					],
// 					// width: ""
// 				}}
// 			>
// 				{listitem.content}
// 			</li>
// 		));
// 		return elements

// 	}

// 	render() {
// 		return (
// 			<div className="size-box">

// 				<label htmlFor="value">
// 					Add Size (Optional)
// 				</label>
// 				<br />
// 				<br />

// 				<TransitionGroup
// 					transitionname="item-transition"
// 					transitionentertimeout={500}
// 					transitionleavetimeout={210}
// 				>
// 									{this.makeAddedList()}

// 				</TransitionGroup>

				
// 			<input
// 					id="add"
// 					type="text"
// 					name="initvalue"
// 					autoComplete="off"
// 				  maxLength="70"
// 					onFocus={this.handleFocus}
// 					onChange={this.handleChange}
// 					onKeyPress={this.handleKeypress}
// 					onBlur={this.handleBlur}
// 					value={this.state.content_add}
// 					style={{ width: this.state.width }}
// 				/>

// 				<span id="helperspan" ref={el => (this.helperspan = el)}>
// 					{this.state.content_add}
// 				</span>

// 			</div>
// 		);
// 	}
// }
// export default UserGeneratedPills;

