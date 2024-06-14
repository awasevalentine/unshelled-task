import { Grid } from "@mui/material";


interface columnsTyps {
    xs?: number;
    md?: number;
    lg?: number;
}
type IProps = {
    gridColumns?: {
        xs?: number;
        md?: number;
        lg?: number;
    };
    gridSpacing?: number;
    gridColSpacing?: number;
    gridRowSpacing?: number;
    children: React.ReactNode
}

const GridLayout = ({gridColumns, gridColSpacing, gridRowSpacing, gridSpacing, children}: IProps) => {

    return ( 
        <div className="w-full h-full">
            <Grid container spacing={gridSpacing ? gridSpacing : 6} rowSpacing={gridRowSpacing} columnSpacing={gridColSpacing}>
                <Grid xs={gridColumns?.xs} md={gridColumns?.md}>
                    {children}
                </Grid>
            </Grid>
        </div>
     );
}
 
export default GridLayout;