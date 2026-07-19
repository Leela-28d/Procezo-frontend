import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import {
    getWorkflows,
    createWorkflow,
    activateWorkflow
} from "../services/workflowService";

import "./Workflow.css";

function Workflow() {

    const [name, setName] = useState("");

    const [workflows, setWorkflows] = useState([]);

    const [stages, setStages] = useState([
        {
            stageName: "",
            approverRole: "MANAGER",
            escalationThresholdHours: 24
        }
    ]);

    const loadWorkflows = async () => {

        try {

            const data = await getWorkflows();

            console.log("GET Response:", data);
            console.log("Is Array:", Array.isArray(data));

            if (Array.isArray(data)) {
                setWorkflows(data);
            } else {
                console.error("Backend did not return an array.");
                setWorkflows([]);
            }

        } catch (err) {

            console.error("Error loading workflows:", err);
            setWorkflows([]);

        }

    };

    useEffect(() => {

        loadWorkflows();

    }, []);

    const addStage = () => {

        setStages([
            ...stages,
            {
                stageName: "",
                approverRole: "MANAGER",
                escalationThresholdHours: 24
            }
        ]);

    };

    const updateStage = (index, field, value) => {

        const temp = [...stages];

        temp[index][field] = value;

        setStages(temp);

    };

    const saveWorkflow = async () => {

        try {

            const response = await createWorkflow({
                name,
                stages
            });

            console.log("POST Response:", response);

            alert("Workflow Created");

            setName("");

            setStages([
                {
                    stageName: "",
                    approverRole: "MANAGER",
                    escalationThresholdHours: 24
                }
            ]);

            await loadWorkflows();

        } catch (err) {

            console.error("Save Error:", err);

        }

    };

    const activate = async (id) => {

    try {

        await activateWorkflow(id);

        alert("Workflow Activated");

        loadWorkflows();

    } catch (err) {

        console.error(err);

    }

};

    return (

        <>

            <Sidebar />

            <div className="workflow-page">

                <h1>Workflow Configuration</h1>

                <div className="workflow-form">

                    <input
                        placeholder="Workflow Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    {

                        stages.map((stage, index) => (

                            <div
                                key={index}
                                className="stage-card"
                            >

                                <input
                                    placeholder="Stage Name"
                                    value={stage.stageName}
                                    onChange={(e) =>
                                        updateStage(
                                            index,
                                            "stageName",
                                            e.target.value
                                        )
                                    }
                                />

                                <select
                                    value={stage.approverRole}
                                    onChange={(e) =>
                                        updateStage(
                                            index,
                                            "approverRole",
                                            e.target.value
                                        )
                                    }
                                >

                                    <option value="MANAGER">
                                        Manager
                                    </option>

                                    <option value="FINANCE">
                                        Finance
                                    </option>

                                    <option value="PROCUREMENT">
                                        Procurement
                                    </option>

                                </select>

                                <input
                                    type="number"
                                    value={stage.escalationThresholdHours}
                                    onChange={(e) =>
                                        updateStage(
                                            index,
                                            "escalationThresholdHours",
                                            Number(e.target.value)
                                        )
                                    }
                                />

                            </div>

                        ))

                    }

                    <button onClick={addStage}>
                        Add Stage
                    </button>

                    <button onClick={saveWorkflow}>
                        Save Workflow
                    </button>

                </div>

                <h2>Existing Workflows</h2>

                <table>

                    <thead>

                        <tr>

                            <th>Name</th>
                            <th>Stages</th>
                            <th>Status</th>
                            <th>Status</th>
                            <th>Action</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            Array.isArray(workflows) && workflows.length > 0 ? (

                                workflows.map((workflow) => (

                                    <tr key={workflow.id}>

                                        <td>{workflow.name}</td>

                                        <td>
                                            {workflow.stages
                                                ? workflow.stages.length
                                                : 0}
                                        </td>

                                        <td>
                                            {workflow.active
                                                ? "Active"
                                                : "Inactive"}
                                        </td>

                                        <td>

                                            {

                                                workflow.active ?

                                                <button disabled>

                                                    Active

                                                </button>

                                                :

                                                <button
                                                    onClick={() => activate(workflow.id)}
                                                >

                                                    Activate

                                                </button>

                                            }

                                        </td>

                                    </tr>

                                ))

                            ) : (

                                <tr>

                                    <td
                                        colSpan="4"
                                        style={{ textAlign: "center" }}
                                    >
                                        No workflows found
                                    </td>

                                </tr>

                            )

                        }

                    </tbody>

                </table>

            </div>

        </>

    );

}

export default Workflow;