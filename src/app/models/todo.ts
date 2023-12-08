export interface Todo {
    key: string
    title: string
    discription: string
    id: number
    assigneduser: {
        id: number;
        name: string;
    }
    , todocreater: {
        uid: number;
        username: string;
        sdate: any;
        edate: any;
    }
}
