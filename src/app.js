"use strict";

import Login             from './views/pages/Login.js'
import Register          from './views/pages/Register.js'
import Incidents         from './views/pages/Incidents.js'
import Incident          from './views/pages/Incident.js'
import CreateIncident    from './views/pages/CreateIncident.js'
import UpdateIncident    from './views/pages/UpdateIncident.js'
import Redflags          from './views/pages/Redflags.js'
import Interventions     from './views/pages/Interventions.js'
import NotFound          from './views/pages/NotFound.js'
import AdminLogin        from './views/pages/AdminLogin.js'
import AdminIncidents    from './views/pages/AdminIncidents.js'
import UserProfile       from './views/pages/UserProfile.js'

import Navbar            from './views/components/Navbar.js'
import Footerbar         from './views/components/Footerbar.js' 

import IncidentUtils     from './services/IncidentUtils.js'
import UserUtils         from './services/UserUtils.js';

// List of supported routes. 
// Any url other than these routes should throw a 404 error.
const routes = {
    '/'                                    : Login
    , '/login'                             : Login
    , '/register'                          : Register
    , '/incidents'                         : Incidents
    , '/incidents/:incident_id'            : Incident
    , '/add-incident'                      : CreateIncident
    , '/edit/:incident_id'                 : UpdateIncident
    , '/redflags'                          : Redflags
    , '/interventions'                     : Interventions
    , '/notfound'                          : NotFound
    , '/admin_login'                       : AdminLogin
    , '/admin_incidents'                   : AdminIncidents
    , '/profile/:username'                 : UserProfile
};

// The router code. Takes a URL, checks against the list of supported routes
// and then renders the corresponding content page.
const router = async () => {
    // Lazy load view element:
    const header = null || document.getElementById('header_container');
    const content = null || document.getElementById('page_container');
    const footer = null || document.getElementById('footer_container');
    
    // Render the Header and footer of the page
    header.innerHTML = await Navbar.render();
    await Navbar.after_render();
    footer.innerHTML = await Footerbar.render();
    await Footerbar.after_render();

    // Get the parsed URl from the addressbar
    let incidentRequest = IncidentUtils.parseRequestURLIncident()
    let userRequest = UserUtils.parseRequestURLUser()

    // Parse the URL and if it has an id part, change it with the string ":id"
    let parsedURLIncidents = (incidentRequest.resource ? '/' + incidentRequest.resource : '/') + (incidentRequest.incident_id ? '/:incident_id' : '') + (incidentRequest.verb ? '/' + incidentRequest.verb : '')
    let parsedURLUser = (userRequest.resource ? '/' + userRequest.resource : '/') + (userRequest.username ? '/:username' : '') + (userRequest.verb ? '/' + userRequest.verb : '')
    
    // Get the page from our hash of supported routes.
    // If the parsed URL is not in our list of supported routes, select the 404 page instead
    let page = routes[parsedURLIncidents] ? routes[parsedURLIncidents] : routes[parsedURLUser] ? routes[parsedURLUser] : NotFound
    content.innerHTML = await page.render();
    await page.after_render(); 
}

// Listen on hash change:
window.addEventListener('hashchange', router);

// Listen on page load:
window.addEventListener('load', router);
