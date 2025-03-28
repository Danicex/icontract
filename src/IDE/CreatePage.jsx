"use client";
import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, History, Clock } from "lucide-react";
import { useMyContext } from '@/Context/AppContext';
import axios from 'axios';

export default function CreatePage() {
  const [projects, setProjects] = useState([]);
  const [projectName, setProjectName] = useState("");
  const {api_enpoint}= useMyContext
  const [projectDescription, setProjectDescription] = useState("");

  const handleCreateProject = () => {
    if (!projectName.trim()) return;

    const newProject = {
      id: Date.now(),
      name: projectName,
      description: projectDescription,
      createdAt: new Date(),
    };

    setProjects([newProject, ...projects]);
    setProjectName("");
    setProjectDescription("");
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };


  const createproject = ()=>{
    const formdata = new FormData()
    formdata.append('project[name]', projectName)
    formdata.append('project[desription]', projectDescription)
    
      axios.post(`${api_enpoint}/projects`, formdata).then(
        res=>{console.log(res)
    setProjectName("");
    setProjectDescription("");
        }
      ).catch(err=>{console.log(err)
        setProjectName("");
        setProjectDescription("");
      })
  };


  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">Project Management</h1>
      <Tabs defaultValue="create" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="create" className="flex items-center gap-2">
            <PlusCircle className="h-4 w-4" /> Create Project
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <History className="h-4 w-4" /> History
          </TabsTrigger>
        </TabsList>
        <TabsContent value="create">
          <Card>
            <CardHeader>
              <CardTitle>Create a new project</CardTitle>
              <CardDescription>Fill in the details below to create your new project.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="project-name">Project Name</Label>
                <Input id="project-name" placeholder="Enter project name" value={projectName} onChange={(e) => setProjectName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="project-description">Description</Label>
                <Textarea id="project-description" placeholder="Describe your project" rows={4} value={projectDescription} onChange={(e) => setProjectDescription(e.target.value)} />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={createproject} disabled={!projectName.trim()} className="w-full sm:w-auto bg-purple-500">Create Project</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Project History</CardTitle>
              <CardDescription>View all your previously created projects.</CardDescription>
            </CardHeader>
            <CardContent>
              {projects.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">No projects created yet. Create your first project in the Create tab.</div>
              ) : (
                <div className="space-y-4">
                  {projects.map((project) => (
                    <div key={project.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium text-lg">{project.name}</h3>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" /> {formatDate(project.createdAt)}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{project.description || "No description provided."}</p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
