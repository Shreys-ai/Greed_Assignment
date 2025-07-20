class MethodsOfToDoApp {
    constructor() {
        this.fs = require('fs').promises;
        this.filePath = '../common_Class/todos.json';
    }

    async addTodo(todo) {
        const todos = await this.loadTodos();
        console.log("Adding todo: " + todo);
        console.log("Current todos: ", typeof todos);
        todos.push(todo);
        await this.saveTodos(todos);
    }

    async printToDoList() {
        const todosList = await this.loadTodos();
        todosList.forEach((todo, index) => {
            console.log(`${index}. ${todo}`);
        });
        return todosList;
    }

    async loadTodos() {
        try {
            console.log("Loading todos from file: " + this.filePath);
            const data = await this.fs.readFile(this.filePath, 'utf-8');
            console.log("Working fine!!!   " + data);
            return JSON.parse(data);
        } catch (err) {
            console.error("Error reading file:", err);
            return [];
        }
    }

    async saveTodos(todos) {
        await this.fs.writeFile(this.filePath, JSON.stringify(todos, null, 2));
    }

    async createFile(userName) {
        const path = require('path');
        try {
            const userFilePath = path.join(__dirname, `../common_Class/${userName}.json`);
            await this.fs.writeFile(userFilePath, JSON.stringify([], null, 2), 'utf8');
            this.filePath = userFilePath;
        } catch (error) {
            console.error("Error creating file:", error);
        }
    }
}

module.exports = MethodsOfToDoApp;