"use client";
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function ServiceLibrary() {
  const [services, setServices] = useState([]);
  const [isAdmin, setIsAdmin] = useState(true); // For demo purposes, set to true
  const [newService, setNewService] = useState({ name: '', category: 'electrical', description: '', isActive: true });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  
  // Initial services data
  useEffect(() => {
    // This would normally be fetched from an API
    const initialServices = [
      { id: 1, name: 'Electrical Installation', category: 'electrical', description: 'Complete electrical system installation for new construction', isActive: true },
      { id: 2, name: 'Electrical Repair', category: 'electrical', description: 'Repair of existing electrical systems and components', isActive: true },
      { id: 3, name: 'Panel Upgrades', category: 'electrical', description: 'Upgrade electrical panels to meet modern standards and codes', isActive: true },
      { id: 4, name: 'Lighting Installation', category: 'electrical', description: 'Installation of interior and exterior lighting systems', isActive: true },
      { id: 5, name: 'Generator Installation', category: 'electrical', description: 'Installation of backup power generators', isActive: true },
      { id: 6, name: 'Plumbing Installation', category: 'plumbing', description: 'Installation of plumbing systems for new construction', isActive: false },
      { id: 7, name: 'Plumbing Repair', category: 'plumbing', description: 'Repair of existing plumbing systems', isActive: false },
      { id: 8, name: 'Roofing Installation', category: 'roofing', description: 'Installation of new roofs', isActive: false },
      { id: 9, name: 'Roofing Repair', category: 'roofing', description: 'Repair of existing roofs', isActive: false },
      { id: 10, name: 'HVAC Installation', category: 'hvac', description: 'Installation of heating, ventilation, and air conditioning systems', isActive: false },
    ];
    
    setServices(initialServices);
  }, []);
  
  const handleAddService = () => {
    if (!newService.name || !newService.description) return;
    
    if (isEditing) {
      // Update existing service
      setServices(services.map(service => 
        service.id === editingId ? { ...service, ...newService } : service
      ));
      setIsEditing(false);
      setEditingId(null);
    } else {
      // Add new service
      const newId = Math.max(...services.map(s => s.id), 0) + 1;
      setServices([...services, { id: newId, ...newService }]);
    }
    
    // Reset form
    setNewService({ name: '', category: 'electrical', description: '', isActive: true });
  };
  
  const handleEditService = (service) => {
    setNewService({ 
      name: service.name, 
      category: service.category, 
      description: service.description,
      isActive: service.isActive
    });
    setIsEditing(true);
    setEditingId(service.id);
  };
  
  const handleDeleteService = (id) => {
    setServices(services.filter(service => service.id !== id));
    
    if (isEditing && editingId === id) {
      setIsEditing(false);
      setEditingId(null);
      setNewService({ name: '', category: 'electrical', description: '', isActive: true });
    }
  };
  
  const handleToggleActive = (id) => {
    setServices(services.map(service => 
      service.id === id ? { ...service, isActive: !service.isActive } : service
    ));
  };
  
  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || service.category === filterCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'electrical', label: 'Electrical' },
    { value: 'plumbing', label: 'Plumbing' },
    { value: 'carpentry', label: 'Carpentry' },
    { value: 'roofing', label: 'Roofing' },
    { value: 'hvac', label: 'HVAC' },
    { value: 'painting', label: 'Painting' },
    { value: 'landscaping', label: 'Landscaping' },
    { value: 'other', label: 'Other' }
  ];
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col items-center space-y-6 text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Service Library</h1>
        <p className="max-w-[700px] text-gray-500 md:text-xl">
          Browse and manage available services for contractors
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Available Services</CardTitle>
                  <CardDescription>
                    Services that contractors can offer through our platform
                  </CardDescription>
                </div>
                <div className="flex space-x-2">
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {categories.map(category => (
                      <option key={category.value} value={category.value}>{category.label}</option>
                    ))}
                  </select>
                  <Input 
                    placeholder="Search services..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-[200px]"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredServices.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    No services found matching your criteria
                  </div>
                ) : (
                  filteredServices.map(service => (
                    <div key={service.id} className={`p-4 border rounded-lg ${service.isActive ? 'bg-white' : 'bg-gray-50'}`}>
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center">
                            <h3 className="font-medium text-lg">{service.name}</h3>
                            {!service.isActive && (
                              <span className="ml-2 px-2 py-1 text-xs bg-gray-200 text-gray-700 rounded-full">Inactive</span>
                            )}
                            <span className="ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full capitalize">{service.category}</span>
                          </div>
                          <p className="text-gray-600 mt-1">{service.description}</p>
                        </div>
                        
                        {isAdmin && (
                          <div className="flex space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleToggleActive(service.id)}
                            >
                              {service.isActive ? 'Deactivate' : 'Activate'}
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleEditService(service)}
                            >
                              Edit
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="text-red-600 hover:bg-red-50"
                              onClick={() => handleDeleteService(service.id)}
                            >
                              Delete
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {isAdmin && (
          <div>
            <Card>
              <CardHeader>
                <CardTitle>{isEditing ? 'Edit Service' : 'Add New Service'}</CardTitle>
                <CardDescription>
                  {isEditing ? 'Update service details' : 'Add a new service to the library'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="serviceName">Service Name</Label>
                    <Input 
                      id="serviceName" 
                      value={newService.name}
                      onChange={(e) => setNewService({...newService, name: e.target.value})}
                      placeholder="e.g., Electrical Installation"
                    />
                  </div>
                  
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="serviceCategory">Category</Label>
                    <select
                      id="serviceCategory"
                      value={newService.category}
                      onChange={(e) => setNewService({...newService, category: e.target.value})}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {categories.filter(c => c.value !== 'all').map(category => (
                        <option key={category.value} value={category.value}>{category.label}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="serviceDescription">Description</Label>
                    <textarea
                      id="serviceDescription"
                      value={newService.description}
                      onChange={(e) => setNewService({...newService, description: e.target.value})}
                      className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Describe the service..."
                    ></textarea>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      id="serviceActive" 
                      checked={newService.isActive}
                      onChange={(e) => setNewService({...newService, isActive: e.target.checked})}
                      className="rounded" 
                    />
                    <Label htmlFor="serviceActive">Active</Label>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex space-x-2 w-full">
                  {isEditing && (
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => {
                        setIsEditing(false);
                        setEditingId(null);
                        setNewService({ name: '', category: 'electrical', description: '', isActive: true });
                      }}
                    >
                      Cancel
                    </Button>
                  )}
                  <Button 
                    className="flex-1"
                    onClick={handleAddService}
                    disabled={!newService.name || !newService.description}
                  >
                    {isEditing ? 'Update Service' : 'Add Service'}
                  </Button>
                </div>
              </CardFooter>
            </Card>
            
            <div className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Service Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Active services are visible to contractors and clients. Inactive services are hidden but preserved for future use.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center">
                        <div className="bg-blue-100 p-2 rounded-full mr-3">
                          <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                          </svg>
                        </div>
                        <span className="font-medium">Active Services</span>
                      </div>
                      <span className="text-lg font-bold">{services.filter(s => s.isActive).length}</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <div className="bg-gray-200 p-2 rounded-full mr-3">
                          <svg className="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path>
                          </svg>
                        </div>
                        <span className="font-medium">Inactive Services</span>
                      </div>
                      <span className="text-lg font-bold">{services.filter(s => !s.isActive).length}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/admin/settings">Back to Admin Settings</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-12 text-center">
        <p className="text-gray-500 mb-4">
          Looking to offer services as a contractor?
        </p>
        <Button asChild>
          <Link href="/contractor-signup">Register as a Contractor</Link>
        </Button>
      </div>
    </div>
  );
}
