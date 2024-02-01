class ColorService{

    GetStatus(status){
        const numericStatus = parseInt(status, 10);
        if (numericStatus >= 0 && numericStatus < 20) {
          return 'primary'; // Azul
        } else if (numericStatus >=20 && numericStatus <= 60) {
          return 'error'; // Rojo
        }else if (numericStatus > 60 && numericStatus <= 100) {
          return 'success'; // Verde
        } else {
          return 'default'; // Color por defecto
        }
    }

    GetPriority(priority){
        let badgeColor, borderColor, flagColor;
        const trimmedPriority = priority.trim().toUpperCase();
        switch (trimmedPriority) {
          case 'LOW':
            badgeColor = 'blue';
            borderColor = '#2196F3'; // Azul
            flagColor = '#2196F3'; // Azul
            break;
          case 'NORMAL':
            badgeColor = 'yellow';
            borderColor = '#FFEB3B'; // Amarillo
            flagColor = '#FFEB3B'; // Negro
            break;
          case 'HIGH':
            badgeColor = 'red';
            borderColor = '#FF5722'; // Rojo
            flagColor = '#FF5722'; // Rojo
            break;
          case 'URGENT':
            badgeColor = 'maroon';
            borderColor = '#800000'; // Borgoña
            flagColor = '#800000'; // Borgoña
            break;
          default:
            badgeColor = 'default';
            borderColor = 'transparent';
            flagColor = 'transparent';
        }

        let result ={
            BorderColor:borderColor,
            BadgeColor:badgeColor,
            FlagColor:flagColor
        }

        return result;
    }
    
}

export default ColorService;