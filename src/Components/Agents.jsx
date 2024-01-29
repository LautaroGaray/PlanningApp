import Avatar from '@mui/material/Avatar';
import Colors from '../Colors.js'
import { border } from '@mui/system';

const Agents =({agent})=>{
   
        const firstLetter = agent.charAt(0).toUpperCase();
        const secondLetter = agent.charAt(1).toUpperCase();
    
        let backgroundColor = Colors.Light[firstLetter]; // Color claro según la primera letra
        let borderColor = Colors.Light[secondLetter]; // Color claro según la segunda letra
        let textColor = Colors.Dark[firstLetter]; // Color oscuro según la primera letra

        if(agent === "LG"){
          backgroundColor = '#001f3f';
          borderColor = '#00e676';
          textColor ='#ffffff';
        }
    
        return (
          <Avatar
            sx={{
              backgroundColor: backgroundColor,
              border: `2px solid ${borderColor}`,
              color: textColor,
            }}
          >
            {agent}
          </Avatar>
        );
      };
    
     
    
    export default Agents;