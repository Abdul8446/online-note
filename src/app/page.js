"use client";
import { UserContext } from "../context/UserContext";
import { useContext, useEffect, useState } from "react";
import Navbar from "@/components/navbar/Navbar";
import Card from "@/components/card/Card";
import Addnote from "@/components/addNote/Addnote";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Home() {
  const { getId, isLogged } = useContext(UserContext);
  const [notes, setNotes] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const user = getId();
  useEffect(() => {
    axios.get(`/api/notes/${user}`).then((res) => {
      setNotes(res.data);
    });
  }, [refresh]);

  const refetch = () => {
    setRefresh(!refresh);
  };
  return (
    <>
      <Navbar />
      <div className="container mx-auto max-w-screen-lg min-h-screen p-4 ">
        <div className="NotesList lg:grid grid-cols-3 gap-6 space-y-8 lg:space-y-0">
          {isLogged() ? (
            <Addnote refresh={refetch} />
          ) : (
            <h2>Please Login First</h2>
          )}
          {notes.map((i) => {
            return <Card key={i._id} data={i} refresh={refetch} />;
          })}
        </div>
      </div>
    </>
  );
}
