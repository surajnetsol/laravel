export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            tasks: []
        };
        // bind
        this.handleChange = this.handleChange.bind(this);
    }
    // handle change
    handleChange(e) {
        this.setState({
            name: e.target.value
        });
        console.log("onChange", this.state.name);
    }

    // bind handleSubmit method
    handleSubmit(e) {
        // stop browser's default behaviour of reloading on form submit
        e.preventDefault();
        axios
            .post("/tasks", {
                name: this.state.name
            })
            .then(response => {
                console.log("from handle submit", response);
                // set state
                this.setState({
                    tasks: [response.data, ...this.state.tasks]
                });
                // then clear the value of textarea
                this.setState({
                    name: ""
                });
            });
    }

    getTasks() {
        axios.get("/tasks").then((
            response // console.log(response.data.tasks)
        ) =>
            this.setState({
                tasks: [...response.data.tasks]
            })
        );
    }
    // lifecycle method
    componentWillMount() {
        this.getTasks();
    }

    renderTasks() {
        return this.state.tasks.map(task => (
            <div key={task.id} className="media">
                <div className="media-body">
                    <p>{task.name}</p>
                </div>
            </div>
        ));
    }

    render() {
        <textarea
            onChange={this.handleChange}
            value={this.state.name}
            className="form-control"
            rows="5"
            maxLength="255"
            placeholder="Create a new task"
            required
        />;
    }
}
