import { ProjectOutlined } from '@ant-design/icons'
import { IResourceItem } from '@refinedev/core'

export const resources: IResourceItem[] = [
    
    {
        name: 'tasks',
        list: '/tasks',
        create: 'tasks/new',
        edit: '/tasks/edit/:id/',
        meta:{
            label: 'Kanban',
            icon: <ProjectOutlined/>
        }
    }
]