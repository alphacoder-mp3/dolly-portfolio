import React,{useContext} from 'react';

import { ThemeContext } from '../../contexts/ThemeContext';

import './Experience.css';

import { experienceData } from '../../data/experienceData'
import ExperienceCard from './ExperienceCard';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import { makeStyles } from '@material-ui/core/styles';

import './Experience.css'

const useStyles = makeStyles((theme) => ({
    closeButton: {
      position: 'absolute',
      top: theme.spacing(2),
      right: theme.spacing(2),
      zIndex: 1,
      color: theme.palette.text.secondary,
    },
  }));

function Experience() {

    const [open, setOpen] = React.useState(false);
    const [selectedExperience, setSelectedExperience] = React.useState(null);

    const handleOpen = (experience) => {
        setSelectedExperience(experience);
        setOpen(true);
    };
    const handleClose = () => setOpen(false);

    const { theme } = useContext(ThemeContext);

    const classes = useStyles();

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '90%',
        maxHeight: '60vh',
        overflowY: 'auto',
        bgcolor: theme?.secondary,
        boxShadow: 24,
        p: 4,
        overflow: 'auto',
      };

      const styleD = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '90%',
        maxWidth: 600,
        bgcolor: theme.secondary,
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
        outline: 'none',
        borderRadius: 8,
        p: 4,
      };

      const descriptionStyle = {
        color: theme.tertiary80,
        fontSize: '1rem',
        mt: 2
      };

    return (
        <div className="experience" id="experience" style={{backgroundColor: theme.secondary}}> 
             <div className="experience-body">
                 <div className="experience-image">
                     <img src={theme.expimg} alt="" />
                 </div>
                 <div className="experience-description">
                    <h1 style={{color:theme.primary}}>Experience</h1>
                    {experienceData.map(exp =>(
                        <ExperienceCard 
                            key={exp.id}
                            id={exp.id}
                            jobtitle={exp.jobtitle}
                            company={exp.company}
                            startYear={exp.startYear}
                            endYear={exp.endYear}
                            experience={exp}
                            handleOpen={() => handleOpen(exp)}/>
                    ))}
                 </div>
             </div>
             <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Box sx={window.innerWidth < 600 ? style : styleD}>
                    <IconButton
                        className={classes.closeButton}
                        onClick={handleClose}
                        aria-label="Close"
                        style={{color: theme?.tertiary, background: theme?.primary,  fontSize: '0.8rem', padding: '6px'}}
                     >
                        <CloseIcon style={{ fontSize: '1rem', borderRadius: '50%', }}/>
                    </IconButton>
                    <div>
                        <Typography variant="h6" component="h2" style={{color: theme.tertiary, marginBottom: '0.5rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontStyle: 'italic'}}> 
                            {selectedExperience?.jobtitle}
                        </Typography>
                        <Typography variant="h5" component="h3" style={{color: theme.primary, marginBottom: '0.5rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginRight:'1rem', fontWeight: 'bold'}}>
                            {selectedExperience?.company}
                        </Typography>
                    </div>
                    <div style={{ maxHeight: window.innerWidth < 600 ? 'calc(55vh - 120px)' :'', overflowY: window.innerWidth < 600 ? 'auto' : ''}}>
                        <Typography sx={descriptionStyle} dangerouslySetInnerHTML={{ __html: selectedExperience?.exp }} style={{color: theme.tertiary80}}/>
                    </div>
                </Box>
            </Modal>
        </div>
    )
}

export default Experience
