class File {
    constructor() {
        this.readline = require('node:readline');
        const MethodsOfToDoApp = require('../common_Class/MethodsOfToDoApp');
        this.todoList = new MethodsOfToDoApp();
    }

    async getUserInput(question) {
        const rl = this.readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        return new Promise((resolve) => {
            rl.question(question, (answer) => {
                resolve(answer);
                rl.close();
            });
        });
    }

    async main() {
        const userName = await this.getUserInput("What is your name? ");
        console.log("Hello, " + userName + "!");
        console.log("Welcome To The Todo List Application");
        const actionNeedToPerform = await this.getUserActions();
        console.log("actionNeedToPerform: " + actionNeedToPerform);
        if (actionNeedToPerform == "add") {
            await this.wantToCreateNewFile(userName);
        }
        this.performUserAction(actionNeedToPerform);

    }

    async getUserActions() {
        console.log("You can add, list, or delete todos.");
        const action = await this.getUserInput("What you want to do? (add/list/delete)");
        return action;
    }

    async performUserAction(action) {
        switch (action) {
            case 'add':
                const newTodo = await this.getUserInput("Enter your todo task: ");
                // console.log("Adding todo: " + newTodo);
                this.todoList.addTodo(newTodo);
                console.log(`Added -> ${newTodo}`);
                break;

            case 'list':
                console.log("Your Todo List:");
                this.todoList.printToDoList();
                break;

            case 'delete':
                const indexToDelete = await this.getUserInput("Enter the index of the todo to delete: ");
                const todos = await this.todoList.loadTodos();
                if (indexToDelete >= 0 && indexToDelete < todos.length) {
                    const deletedTodo = todos.splice(indexToDelete, 1);
                    await this.todoList.saveTodos(todos);
                    console.log(`Deleted todo: ${deletedTodo}`);
                    const seeUpdatedList = await this.getUserInput("Want to see Updated To-Do List? (yes/no) ");
                    if (seeUpdatedList.toLowerCase() === "yes") {
                        console.log("Updated To-Do List:");
                        this.todoList.printToDoList();
                    }
                } else {
                    console.log("Invalid index. No todo deleted.");
                }
                break;
        }

    }

    async wantToCreateNewFile(userName) {
        const createFileResponse = await this.getUserInput("Do you want to create a new file? (yes/no) ");
        if (createFileResponse === "yes") {
            await this.todoList.createFile(userName);
            console.log("File created for user: " + userName);
        } else {
            console.log("File creation skipped.");
            console.log("Using existing file todos.json");
        }
    }


}
const func = new File()
func.main()