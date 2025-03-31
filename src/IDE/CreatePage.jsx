"use client";
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, History, Clock } from "lucide-react";
import { useMyContext } from '@/Context/AppContext';
import axios from 'axios';
import Navbar from '@/Landingpage/Navbar';

export default function CreatePage() {
  const { walletAdd, setWalletAdd, api_enpoint } = useMyContext();
  const [header, setHeader] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [hash, setHash] = useState('');
  const x = localStorage.getItem('history')
  const projectHistory = Array.isArray(x);
  const navigate = useNavigate();

  useEffect(() => {
    if (!walletAdd) {
      setHeader(true);
    }
  }, [walletAdd]);

  const generateHash = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const randomValues = new Uint32Array(20);
    window.crypto.getRandomValues(randomValues);

    for (let i = 0; i < 20; i++) {
      result += characters.charAt(randomValues[i] % characters.length);
    }

    setHash(result);
    return result;
  };

  const handleCreateProject = async () => {
    if (!walletAdd) {
      setHeader(true);
      return;
    }

    const projectHash = generateHash();
    const timestamp = new Date().toISOString();

  const formData = {
      project_name: projectName,
      project_description: projectDescription,
      wallet_address: walletAdd,
      project_hash: projectHash,
      contract_file: [],
      created_at: timestamp
    };

    try {
      const response = await axios.post(`${api_enpoint}/projects`, formData);
      const { id } = response.data;

      // Update history
      const newProject = {
        name: projectName,
        description: projectDescription,
        project_hash: hash,
        created_at: timestamp,
        wallet_address: walletAdd
      };
      
      
      const updatedHistory = [newProject, ...projectHistory];
      setProjectHistory(updatedHistory);
      localStorage.setItem('history', JSON.stringify(updatedHistory));

      setSuccessMessage(true);
      setProjectName("");
      setProjectDescription("");
      setHash('');

      navigate('/homepage', { 
        state: {
          project_id: id,
          wallet_address: walletAdd,
        }
      });

    } catch (error) {
      console.error("Error creating project:", error);
      // Handle error state if needed
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown date';
    try {
      const date = new Date(dateString);
      return isNaN(date.getTime()) ? 'Invalid date' : date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      return 'Invalid date';
    }
  };

  return (
    <div className="container mx-auto py-5 px-4">
      {header && (
        <div className='pb-5'>
          <Navbar />
          <p className='text-red-400 capitalize py-4'>You need to connect a wallet!</p>
        </div>
      )}

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
                <Label htmlFor="project-name">Project Name *</Label>
                <Input 
                  id="project-name" 
                  placeholder="Enter project name" 
                  value={projectName} 
                  onChange={(e) => setProjectName(e.target.value)} 
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="project-description">Description</Label>
                <Textarea 
                  id="project-description" 
                  placeholder="Describe your project" 
                  rows={4} 
                  value={projectDescription} 
                  onChange={(e) => setProjectDescription(e.target.value)} 
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handleCreateProject} 
                disabled={!projectName.trim()} 
                className="w-full sm:w-auto bg-purple-500 hover:bg-purple-600"
              >
                Create Project
              </Button>
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
              {projectHistory.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No projects created yet. Create your first project in the Create tab.
                </div>
              ) : (
                <div className="space-y-4">
                  {projectHistory.map((project, index) => (
                    <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium text-lg">{project.name}</h3>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" /> 
                          {formatDate(project.time || project.created_at)}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {project.description || "No description provided."}
                      </p>
                      {project.project_hash && (
                        <p className="text-xs mt-2 font-mono text-gray-500">
                          Hash: {project.project_hash}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {successMessage && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg">
          Project created successfully!
        </div>
      )}
    </div>
  );
}