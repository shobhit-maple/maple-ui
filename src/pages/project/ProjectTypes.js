import {PiGraphBold} from 'react-icons/pi';
import {GrDocumentPerformance} from "react-icons/gr";
import {FaUserGroup} from "react-icons/fa6";

const ProjectTypes = {
  ARCHITECTURE_DIAGRAMS: {
    label: 'Architecture diagrams',
    icon: <PiGraphBold className="project-card-icon"/>,
    className: 'project-card-architecture-diagrams',
  },
  ONE_ON_ONE: {
    label: 'One to one meeting notes',
    icon: <FaUserGroup className="project-card-icon"/>,
    className: 'project-card-one-on-one',
  },
  PERFORMANCE_REVIEWS: {
    label: 'Performance reviews',
    icon: <GrDocumentPerformance className="project-card-icon"/>,
    className: 'project-card-performance-reviews',
  }
};

export default ProjectTypes;
