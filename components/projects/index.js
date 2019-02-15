import React from 'react'
import { inject, observer } from 'mobx-react'
import { computed, observable } from 'mobx'

import Button from '../button'
import Fab from '../fab'
import Input from '../input'
import Modal from '../modal'

@inject('store')
@observer
class Projects extends React.Component {
  inputRef = React.createRef()

  @observable
  isModalOpen = false

  @observable
  modalInput = ''

  selectProject = (projectId) => {
    this.props.store.getProject({ projectId })
  }

  addProject = async () => {
    this.isModalOpen = true
    await this.props.store.addProject({
      name: this.modalInput,
    })
    this.isModalOpen = false
  }

  handleModalSwitch = () => {
    this.isModalOpen = !this.isModalOpen
    this.modalInput = ''
    if (this.isModalOpen && this.inputRef.current) {
      this.inputRef.current.focus()
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.addProject()
  }

  handleModalInputChange = e => (this.modalInput = e.target.value)

  render() {
    const { projects, selectedProject, setSelectedProject } = this.props.store
    return (
      <div>
        <div className="justFlex tabs">
          {/* TODO: if project list is too long move last ones to a dropdown menu */}
          {projects.map((p, index) => (
            <Button onClick={() => this.selectProject(p.id)} text={p.name} key={index.toString()} />
          ))}
          <Fab onClick={this.handleModalSwitch} />
        </div>
        <Modal
          dim
          footer
          title="Create a new project"
          open={this.isModalOpen}
          onClose={this.handleModalSwitch}
          onCancel={this.handleModalSwitch}
          onConfirm={this.addProject}
        >
          <form onSubmit={this.handleSubmit}>
            <Input
              label="Project Name"
              ref={this.inputRef}
              value={this.modalInput}
              onChange={this.handleModalInputChange}
            />
          </form>
        </Modal>
        <style jsx>
          {`
            .tabs {
            }
          `}
        </style>
      </div>
    )
  }
}

export default Projects
