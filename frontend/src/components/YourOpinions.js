import React, {useEffect, useState} from "react";
import { Typography } from "@mui/material";
import OpinionList from "../components/OpinionsList";
import {useAuth} from "../utils/auth";

const YourOpinions = () => {
    const [opinions, setOpinions] = useState([]);
    const auth = useAuth();

    useEffect(() => {
        const fetchOpinions = async () => {
            if (auth.user?.name) {
                try {
                    const response = await fetch(`http://localhost:8080/api/comment/getmy/${auth.user?.name}`);
                    if (response.ok) {
                        const data = await response.json();
                        const formattedOpinions = data.map(opinion => ({
                            id: opinion.id,
                            text: opinion.text,
                            date: opinion.date,
                            userName: opinion.userName,
                            isEditing: false,
                            originalText: ""
                        }));
                        setOpinions(formattedOpinions);
                    } else {
                        console.error("Failed to fetch opinions:", response.status);
                    }
                } catch (error) {
                    console.error("Error fetching opinions:", error);
                }
            }
        };

        fetchOpinions();
    }, [auth.user]);

    return (
        <>
            <Typography variant="h4" sx={{ color: "lavender", margin: "auto", textAlign: "center", marginBottom: "10px" }}>
                Your saved opinions
            </Typography>

            {opinions.length === 0 ? (
                <Typography variant="h6" sx={{ color: "gray", textAlign: "center" }}>
                    No added opinions yet
                </Typography>
            ) : (
                <OpinionList opinions={opinions} setOpinions={setOpinions} allowEditing={true} allowAdding={false} />
            )}
        </>
    );
};

export default YourOpinions;
