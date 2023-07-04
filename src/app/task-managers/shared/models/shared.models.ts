export interface TaskListDetails {
    id: string,
    name: string;
    description: string;
    assigneeEmail: string;
    dueDate: Date;
    status: string;
    priority?: number;
}

export interface ListViewItems extends TaskListDetails {
    priorityType: string;
};

export interface ListViewHeaders {
    key: string;
    label: string;
    type: string;
}

export interface ListViewDDChange {
    key: string;
    value: ListViewItems;
}

export interface DialogData {
    heading: string;
}
