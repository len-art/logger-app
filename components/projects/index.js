import React from 'react'
import { inject, observer } from 'mobx-react'
import { observable } from 'mobx'

import Fab from '../fab'
import Input from '../input'
import Modal from '../modal'

@inject('store')
@observer
class Projects extends React.Component {
  inputRef = React.createRef()

  @observable
  modalInput = ''

  selectProject = (projectId) => {
    this.props.store.getProject({ projectId })
  }

  addProject = async () => {
    const { setIsNewProjectModalOpen } = this.props.store
    await this.props.store.addProject({
      name: this.modalInput,
    })
    setIsNewProjectModalOpen()
  }

  handleModalSwitch = () => {
    const { isNewProjectModalOpen, setIsNewProjectModalOpen } = this.props.store
    setIsNewProjectModalOpen()
    this.modalInput = ''
    if (isNewProjectModalOpen && this.inputRef.current) {
      this.inputRef.current.focus()
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.addProject()
  }

  handleModalInputChange = e => (this.modalInput = e.target.value)

  render() {
    const { projects, selectedProject, isNewProjectModalOpen } = this.props.store
    return (
      <div>
        <div className="justFlex tabs">
          <Fab onClick={this.handleModalSwitch} />
          {/* TODO: if project list is too long move last ones to a dropdown menu */}
          {projects.map((p, index) => (
            <button
              className={`tab${selectedProject === p.id ? ' active' : ''}`}
              onClick={() => this.selectProject(p.id)}
              key={index.toString()}
            >
              {p.name}
            </button>
          ))}
        </div>
        <Modal
          dim
          footer
          title="Create a new project"
          open={isNewProjectModalOpen}
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
            .tab {
              background: transparent;
              padding: 10px;
              border: none;
              border-bottom: 2px solid transparent;
              font-size: 1.5em;
              text-transform: uppercase;
              transition: 0.25s;
            }
            .tab:focus {
              outline: none;
            }

            .active {
              border-bottom: 2px solid #2868dd;
            }

            .tabs {
              align-content: center;
              margin: 10px 0;
            }
          `}
        </style>
      </div>
    )
  }
}

export default Projects
