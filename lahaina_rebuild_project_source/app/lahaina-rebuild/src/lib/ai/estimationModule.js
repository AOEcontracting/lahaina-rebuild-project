// AI Estimation Module for Blueprint Analysis
// This module uses TensorFlow.js to analyze blueprint images and estimate electrical costs

import * as tf from '@tensorflow/tfjs';

// Constants for electrical component detection
const COMPONENT_TYPES = {
  OUTLET: 'outlet',
  SWITCH: 'switch',
  LIGHT_FIXTURE: 'light_fixture',
  PANEL: 'panel',
  GFCI: 'gfci',
  CONDUIT: 'conduit'
};

// Material costs from database (would be fetched from DB in production)
const MATERIAL_COSTS = {
  'outlet': 3.25,
  'switch': 4.50,
  'light_fixture': 35.00,
  'panel_100a': 125.00,
  'panel_200a': 225.00,
  'gfci': 18.75,
  'conduit_per_foot': 1.95,
  'wire_12awg_per_foot': 0.85,
  'wire_14awg_per_foot': 0.65
};

// Labor rates for Lahaina (would be fetched from DB in production)
const LABOR_RATES = {
  'electrician_hourly': 85.00,
  'apprentice_hourly': 45.00,
  'installation_times': {
    'outlet': 0.5, // hours
    'switch': 0.5,
    'light_fixture': 1.0,
    'panel_100a': 6.0,
    'panel_200a': 8.0,
    'gfci': 0.75,
    'conduit_per_foot': 0.1,
  }
};

// Regional cost multiplier for Lahaina, Maui
const LAHAINA_COST_MULTIPLIER = 1.35; // 35% higher than base costs due to location

/**
 * Load and preprocess blueprint image for analysis
 * @param {string} imageUrl - URL of the blueprint image
 * @returns {Promise<tf.Tensor>} - Preprocessed image tensor
 */
export async function preprocessBlueprint(imageUrl) {
  try {
    // Load the image
    const image = await tf.browser.fromPixels(
      await loadImage(imageUrl)
    );
    
    // Preprocess the image
    const preprocessed = tf.tidy(() => {
      // Resize to standard dimensions
      const resized = tf.image.resizeBilinear(image, [512, 512]);
      
      // Normalize pixel values
      const normalized = resized.div(255.0);
      
      // Expand dimensions to match model input requirements
      return normalized.expandDims(0);
    });
    
    // Clean up the original image tensor
    image.dispose();
    
    return preprocessed;
  } catch (error) {
    console.error('Error preprocessing blueprint:', error);
    throw new Error('Failed to preprocess blueprint image');
  }
}

/**
 * Helper function to load an image from URL
 * @param {string} url - Image URL
 * @returns {Promise<HTMLImageElement>} - Loaded image element
 */
function loadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = (err) => reject(new Error('Failed to load image'));
    img.src = url;
  });
}

/**
 * Detect electrical components in a blueprint
 * @param {tf.Tensor} preprocessedImage - Preprocessed blueprint image tensor
 * @returns {Promise<Array>} - Detected components with positions and types
 */
export async function detectComponents(preprocessedImage) {
  try {
    // In a real implementation, we would load a trained model
    // For this prototype, we'll simulate component detection
    
    // Simulate model prediction
    // In production, this would be: const predictions = await model.predict(preprocessedImage);
    
    // Mock detection results for demonstration
    const mockDetections = [
      { type: COMPONENT_TYPES.OUTLET, count: 24, positions: [] },
      { type: COMPONENT_TYPES.SWITCH, count: 18, positions: [] },
      { type: COMPONENT_TYPES.LIGHT_FIXTURE, count: 12, positions: [] },
      { type: COMPONENT_TYPES.PANEL, count: 1, size: '200a', positions: [] },
      { type: COMPONENT_TYPES.GFCI, count: 6, positions: [] },
      { type: COMPONENT_TYPES.CONDUIT, length: 120, positions: [] } // in feet
    ];
    
    // Clean up tensor
    preprocessedImage.dispose();
    
    return mockDetections;
  } catch (error) {
    console.error('Error detecting components:', error);
    throw new Error('Failed to detect electrical components in blueprint');
  }
}

/**
 * Calculate material costs based on detected components
 * @param {Array} components - Detected electrical components
 * @returns {Object} - Calculated material costs
 */
export function calculateMaterialCosts(components) {
  const materialCosts = {
    items: [],
    subtotal: 0,
    total: 0
  };
  
  // Calculate cost for each component type
  components.forEach(component => {
    let cost = 0;
    let description = '';
    
    switch (component.type) {
      case COMPONENT_TYPES.OUTLET:
        cost = component.count * MATERIAL_COSTS.outlet;
        description = `Standard Outlets (${component.count})`;
        break;
      case COMPONENT_TYPES.SWITCH:
        cost = component.count * MATERIAL_COSTS.switch;
        description = `Light Switches (${component.count})`;
        break;
      case COMPONENT_TYPES.LIGHT_FIXTURE:
        cost = component.count * MATERIAL_COSTS.light_fixture;
        description = `Light Fixtures (${component.count})`;
        break;
      case COMPONENT_TYPES.PANEL:
        cost = component.size === '100a' ? 
          MATERIAL_COSTS.panel_100a : 
          MATERIAL_COSTS.panel_200a;
        description = `Electrical Panel (${component.size})`;
        break;
      case COMPONENT_TYPES.GFCI:
        cost = component.count * MATERIAL_COSTS.gfci;
        description = `GFCI Outlets (${component.count})`;
        break;
      case COMPONENT_TYPES.CONDUIT:
        cost = component.length * MATERIAL_COSTS.conduit_per_foot;
        description = `Conduit (${component.length} feet)`;
        break;
    }
    
    // Add to items list
    materialCosts.items.push({
      description,
      quantity: component.type === COMPONENT_TYPES.CONDUIT ? component.length : component.count,
      unitPrice: component.type === COMPONENT_TYPES.CONDUIT ? MATERIAL_COSTS.conduit_per_foot : 
                (component.type === COMPONENT_TYPES.PANEL ? (component.size === '100a' ? MATERIAL_COSTS.panel_100a : MATERIAL_COSTS.panel_200a) : 
                MATERIAL_COSTS[component.type]),
      totalPrice: cost
    });
    
    materialCosts.subtotal += cost;
  });
  
  // Calculate wire costs based on outlets and switches
  const outletCount = components.find(c => c.type === COMPONENT_TYPES.OUTLET)?.count || 0;
  const switchCount = components.find(c => c.type === COMPONENT_TYPES.SWITCH)?.count || 0;
  const gfciCount = components.find(c => c.type === COMPONENT_TYPES.GFCI)?.count || 0;
  
  // Estimate wire length based on components (simplified calculation)
  const estimatedWireLength12AWG = (outletCount + gfciCount) * 15; // 15 feet per outlet/GFCI
  const estimatedWireLength14AWG = switchCount * 12; // 12 feet per switch
  
  const wireCost12AWG = estimatedWireLength12AWG * MATERIAL_COSTS.wire_12awg_per_foot;
  const wireCost14AWG = estimatedWireLength14AWG * MATERIAL_COSTS.wire_14awg_per_foot;
  
  materialCosts.items.push({
    description: `12 AWG Copper Wire (${estimatedWireLength12AWG} feet)`,
    quantity: estimatedWireLength12AWG,
    unitPrice: MATERIAL_COSTS.wire_12awg_per_foot,
    totalPrice: wireCost12AWG
  });
  
  materialCosts.items.push({
    description: `14 AWG Copper Wire (${estimatedWireLength14AWG} feet)`,
    quantity: estimatedWireLength14AWG,
    unitPrice: MATERIAL_COSTS.wire_14awg_per_foot,
    totalPrice: wireCost14AWG
  });
  
  materialCosts.subtotal += wireCost12AWG + wireCost14AWG;
  
  // Apply regional cost multiplier for Lahaina
  materialCosts.total = materialCosts.subtotal * LAHAINA_COST_MULTIPLIER;
  
  return materialCosts;
}

/**
 * Calculate labor costs based on detected components
 * @param {Array} components - Detected electrical components
 * @returns {Object} - Calculated labor costs
 */
export function calculateLaborCosts(components) {
  const laborCosts = {
    items: [],
    subtotal: 0,
    total: 0
  };
  
  // Calculate labor hours for each component type
  components.forEach(component => {
    let hours = 0;
    let description = '';
    
    switch (component.type) {
      case COMPONENT_TYPES.OUTLET:
        hours = component.count * LABOR_RATES.installation_times.outlet;
        description = `Outlet Installation (${component.count})`;
        break;
      case COMPONENT_TYPES.SWITCH:
        hours = component.count * LABOR_RATES.installation_times.switch;
        description = `Switch Installation (${component.count})`;
        break;
      case COMPONENT_TYPES.LIGHT_FIXTURE:
        hours = component.count * LABOR_RATES.installation_times.light_fixture;
        description = `Light Fixture Installation (${component.count})`;
        break;
      case COMPONENT_TYPES.PANEL:
        hours = component.size === '100a' ? 
          LABOR_RATES.installation_times.panel_100a : 
          LABOR_RATES.installation_times.panel_200a;
        description = `Electrical Panel Installation (${component.size})`;
        break;
      case COMPONENT_TYPES.GFCI:
        hours = component.count * LABOR_RATES.installation_times.gfci;
        description = `GFCI Outlet Installation (${component.count})`;
        break;
      case COMPONENT_TYPES.CONDUIT:
        hours = component.length * LABOR_RATES.installation_times.conduit_per_foot;
        description = `Conduit Installation (${component.length} feet)`;
        break;
    }
    
    const cost = hours * LABOR_RATES.electrician_hourly;
    
    // Add to items list
    laborCosts.items.push({
      description,
      hours,
      rate: LABOR_RATES.electrician_hourly,
      totalPrice: cost
    });
    
    laborCosts.subtotal += cost;
  });
  
  // Add apprentice labor (typically 50% of electrician hours)
  const totalElectricianHours = laborCosts.items.reduce((sum, item) => sum + item.hours, 0);
  const apprenticeHours = totalElectricianHours * 0.5;
  const apprenticeCost = apprenticeHours * LABOR_RATES.apprentice_hourly;
  
  laborCosts.items.push({
    description: 'Apprentice Labor',
    hours: apprenticeHours,
    rate: LABOR_RATES.apprentice_hourly,
    totalPrice: apprenticeCost
  });
  
  laborCosts.subtotal += apprenticeCost;
  
  // Apply regional cost multiplier for Lahaina
  laborCosts.total = laborCosts.subtotal * LAHAINA_COST_MULTIPLIER;
  
  return laborCosts;
}

/**
 * Check code compliance based on detected components
 * @param {Array} components - Detected electrical components
 * @param {Object} propertyDetails - Additional property details
 * @returns {Object} - Code compliance results
 */
export function checkCodeCompliance(components, propertyDetails) {
  const complianceResults = {
    compliant: true,
    issues: [],
    recommendations: []
  };
  
  // Get component counts
  const outlets = components.find(c => c.type === COMPONENT_TYPES.OUTLET)?.count || 0;
  const gfciOutlets = components.find(c => c.type === COMPONENT_TYPES.GFCI)?.count || 0;
  const panel = components.find(c => c.type === COMPONENT_TYPES.PANEL);
  
  // Check for GFCI outlets in wet locations (NEC 210.8)
  if (propertyDetails.hasWetLocations && gfciOutlets < 2) {
    complianceResults.compliant = false;
    complianceResults.issues.push({
      code: 'NEC 210.8',
      description: 'GFCI protection required for all 125-volt receptacles in bathrooms, kitchens, and outdoor areas',
      recommendation: 'Add GFCI outlets in bathrooms, kitchen, and outdoor areas'
    });
  }
  
  // Check panel capacity based on home size (simplified)
  if (propertyDetails.squareFootage > 2000 && panel?.size === '100a') {
    complianceResults.compliant = false;
    complianceResults.issues.push({
      code: 'NEC 220',
      description: 'Electrical service capacity insufficient for home size',
      recommendation: 'Upgrade to 200A panel for homes larger than 2000 sq ft'
    });
  }
  
  // Check outlet spacing (NEC 210.52)
  const estimatedWallLength = Math.sqrt(propertyDetails.squareFootage) * 4; // Simplified estimation
  const recommendedOutlets = Math.ceil(estimatedWallLength / 12); // One outlet every 12 feet
  
  if (outlets < recommendedOutlets) {
    complianceResults.compliant = false;
    complianceResults.issues.push({
      code: 'NEC 210.52',
      description: 'Receptacle outlets in habitable rooms should be installed so that no point along the floor line is more than 6 feet from an outlet',
      recommendation: `Add ${recommendedOutlets - outlets} more outlets to meet code requirements`
    });
  }
  
  return complianceResults;
}

/**
 * Generate complete cost estimate based on blueprint analysis
 * @param {string} blueprintUrl - URL of the blueprint image
 * @param {Object} propertyDetails - Additional property details
 * @returns {Promise<Object>} - Complete cost estimate
 */
export async function generateEstimate(blueprintUrl, propertyDetails) {
  try {
    // Preprocess blueprint image
    const preprocessedImage = await preprocessBlueprint(blueprintUrl);
    
    // Detect electrical components
    const detectedComponents = await detectComponents(preprocessedImage);
    
    // Calculate material costs
    const materialCosts = calculateMaterialCosts(detectedComponents);
    
    // Calculate labor costs
    const laborCosts = calculateLaborCosts(detectedComponents);
    
    // Check code compliance
    const codeCompliance = checkCodeCompliance(detectedComponents, propertyDetails);
    
    // Calculate total cost
    const totalCost = materialCosts.total + laborCosts.total;
    
    // Add permit fees (typical for Maui County)
    const permitFees = 250 + (totalCost * 0.03); // Base fee + percentage
    
    // Final estimate
    const estimate = {
      propertyDetails,
      components: detectedComponents,
      materialCosts,
      laborCosts,
      permitFees,
      codeCompliance,
      totalCost: totalCost + permitFees,
      estimateDate: new Date().toISOString(),
      validityPeriod: '30 days' // Estimates valid for 30 days
    };
    
    return estimate;
  } catch (error) {
    console.error('Error generating estimate:', error);
    throw new Error('Failed to generate cost estimate');
  }
}

/**
 * Save estimate to database
 * @param {Object} estimate - Generated estimate
 * @param {string} projectId - Project ID
 * @returns {Promise<string>} - Saved estimate ID
 */
export async function saveEstimate(estimate, projectId) {
  try {
    // In a real implementation, this would save to the database
    // For this prototype, we'll simulate saving
    
    const estimateId = `est_${Date.now()}`;
    
    console.log(`Saved estimate ${estimateId} for project ${projectId}`);
    
    return estimateId;
  } catch (error) {
    console.error('Error saving estimate:', error);
    throw new Error('Failed to save estimate');
  }
}
