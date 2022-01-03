/*import KitchenIcon from '@mui/icons-material/Kitchen';
import WifiIcon from '@mui/icons-material/Wifi';
import TvRoundedIcon from '@mui/icons-material/TvRounded';
import PoolRoundedIcon from '@mui/icons-material/PoolRounded';
import AcUnitRoundedIcon from '@mui/icons-material/AcUnitRounded';
import PetsRoundedIcon from '@mui/icons-material/PetsRounded';
import DirectionsCarRoundedIcon from '@mui/icons-material/DirectionsCarRounded';*/
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import style from "./styles/productDetail.module.css";

export default function Icon({icon}) {
    const iconData = icon.split(" ")
    /*const icons = {
        "WifiIcon": WifiIcon,
        "KitchenIcon": KitchenIcon,
        "TvRoundedIcon": TvRoundedIcon,
        "PoolRoundedIcon": PoolRoundedIcon,
        "AcUnitRoundedIcon": AcUnitRoundedIcon,
        "PetsRoundedIcon": PetsRoundedIcon,
        "DirectionsCarRoundedIcon": DirectionsCarRoundedIcon
    }

    const Icon = icons[iconComponent]*/

    return (
        <>
           {/*<Icon className={style.featureIcon}/>*/}
           <FontAwesomeIcon icon={[
               iconData[0], iconData[1]]} className={style.featureIcon}/>
        </>
    )
}