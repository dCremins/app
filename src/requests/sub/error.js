import React, { Component } from 'react'
import moment from 'moment'

import Date from '../../form/date.js'
import Select from '../../form/select.js'
import Checkbox from '../../form/checkbox.js'
import Textarea from '../../form/textarea.js'

class Error extends Component {
	constructor(props) {
		super(props)
		this.state = {
			kind: '',
			desc: '',
			start: '',
			tried: []
		}
    this.change = this.change.bind(this)
	}

	componentDidMount() {
		if (this.props.info) {
			this.setState({
				kind: this.props.info.kind ? this.props.info.kind : '',
				desc: this.props.info.desc ? this.props.info.desc : '',
				start: this.props.info.start ? moment(this.props.info.start).format('YYYY-MM-DD') : '',
				tried: this.props.info.tried ? this.props.info.tried : []
			})
		}
	}

	change(event) {
		const value = event.target.value
    const name = event.target.name
		if (event.target.type === 'checkbox') {
			let newTried = [...this.state.tried]
			event.target.checked ? newTried.push(value) : newTried.splice(newTried.indexOf(value), 1)
			this.setState({
				tried: newTried
			}, () => {
				const info = {...this.state}
				this.props.setInfo(info)
			})
		} else {
	    this.setState({
				[name]: value
			}, () => {
				const info = {...this.state}
				this.props.setInfo(info)
			})
		}
	}

  render() {
    return (
			<section className="field-group">
				<h2>Error Information</h2>
				<Select
					title='What kind of issue are you having?'
					name='kind'
					type='text'
					options={['Start Up / Boot', 'Monitor / Display', 'Microsoft Office', 'Email / Internet', 'Remote Desktop', 'Phone', 'Laptop / Mobile', 'Other']}
					value={this.state.kind}
					handleChange={this.change}
					placeholder='Select One'
				/>
				<Textarea
					title='Describe the error'
					name='desc'
					value={this.state.desc}
					handleChange={this.change}
					placeholder='Description'
				/>
				<Date
					title='When did this issue begin?'
					name='start'
					value={this.state.start}
					handleChange={this.change}
				/>
				<Checkbox
					title='What have you tried?'
					name='tried'
					options={['Turning it off and on', 'Checked for updates', 'Connected to NCSU or EDURoam WIFI (if internet issue)', 'Other']}
					selectedOptions={this.state.tried}
					handleChange={this.change}
					placeholder='Name'
				/>
		</section>
    )
  }
}

export default Error
