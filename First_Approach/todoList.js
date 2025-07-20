class todoList {
    constructor() {
        const MethodsOfToDoApp = require('../common_Class/MethodsOfToDoApp');
        this.methods = new MethodsOfToDoApp();
    }

    main() {
        const [, , command, ...args] = process.argv;
        console.log(`Command: ${command}, Args: ${args.join(' ')} `);
        this.callCommandToExecute(command, args);
    }

    callCommandToExecute(command, args) {
        switch (command) {
            case 'add':
                const newTodo = args.join(' ').trim();
                this.methods.addTodo(newTodo);
                console.log(`Added -> ${newTodo} `);
                break;

            case 'list':
                this.methods.printToDoList();
                break;

            case 'delete':
                const index = parseInt(args[0]);
                const todosDelete = this.methods.loadTodos();
                const removed = todosDelete.splice(index, 1);
                this.methods.saveTodos(todosDelete);
                console.log(`Deleted: "${removed[0]}"`);
                console.log("Want to see Updated To-Do List: (yes/no)");

                process.stdin.once("data", async function (data) {
                    const answer = data.toString().trim().toLowerCase();
                    if (answer === "yes") {
                        console.log("Updated To-Do List:");
                        this.methods.printToDoList();
                    }
                    process.exit();
                });
                break;

            default:
                console.log("Invalid command. Use one of: add, list, delete");
        }
    }
}

call = new todoList();
call.main();