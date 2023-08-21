import {
  List,
  ListItem,
  IconButton,
  Checkbox,
  ListItemText,
  Collapse,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface Department {
  department: string;
  sub_departments: string[];
}

const departmentsData: Department[] = [
  {
    department: "customer_service",
    sub_departments: ["support", "customer_success"],
  },
  {
    department: "design",
    sub_departments: ["graphic_design", "product_design", "web_design"],
  },
];

const DepartmentList: React.FC = () => {
  const [openDepartments, setOpenDepartments] = useState<{
    [key: string]: boolean;
  }>({});
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [selectedSubDepartments, setSelectedSubDepartments] = useState<
    string[]
  >([]);

  useEffect(() => {
    //Here 
    const newSelectedSubDepartments = [...selectedSubDepartments];
    setSelectedDepartments(
      departmentsData.filter((dept) =>
        dept.sub_departments.every((subDept) =>
          newSelectedSubDepartments.includes(subDept)
        )
      ).map((dept) => dept.department)
    );
  }, [selectedSubDepartments]);


  const handleToggle = (department: string) => {
    setOpenDepartments((prevState) => ({
      ...prevState,
      [department]: !prevState[department],
    }));
  };

  const handleDepartmentSelect = (selected: boolean, department: string) => {
    if (selected) {
      //Adding the selected Department into the selectedDepartment array
      setSelectedDepartments((prevDepartments) => [
        ...prevDepartments,
        department,
      ]);

      // Also adding the respective subDeparment by find the department using department data
      //  and if the department has subDepartment add them into the selectedSubDepartments
      setSelectedSubDepartments((prevState) => [
        ...prevState,
        ...(departmentsData.find((dept) => dept.department === department)
          ?.sub_departments || []),
      ]);
    } else {
      //Removing the department from  the selectedDepartment array
      setSelectedDepartments(
        selectedDepartments.filter((dept) => dept !== department)
      );

      //Also removing the respective subDepartments by applying a filter on the prevState that
      // find all the subDepartments of the current department and filter them out
      setSelectedSubDepartments((prevState) =>
        prevState.filter(
          (subDept) =>
            !departmentsData
              .find((dept) => dept.department === department)
              ?.sub_departments.includes(subDept)
        )
      );
    }
  };

  const handleSubDepartmentSelect = (
    selected: boolean,
    subDepartment: string,
    department: string
  ) => {
    if (selected) {
      setSelectedSubDepartments([...selectedSubDepartments, subDepartment]);
    }
    else{
      setSelectedSubDepartments(
        selectedSubDepartments.filter((subDept) => subDept !== subDepartment)
      );
  
      setSelectedDepartments((prevState) =>
        prevState.filter((dept) => dept !== department)
      );
    }
  };

  return (
    <List>
      {departmentsData.map((dept) => (
        <div key={dept.department} style={{ backgroundColor: "aliceblue" }}>
          <ListItem>
            <IconButton
              edge="start"
              onClick={() => handleToggle(dept.department)}
            >
              {openDepartments[dept.department] ? (
                <ExpandLessIcon />
              ) : (
                <ExpandMoreIcon />
              )}
            </IconButton>
            <Checkbox
              checked={selectedDepartments.includes(dept.department)}
              onChange={(e) =>
                handleDepartmentSelect(e.target.checked, dept.department)
              }
            />
            <ListItemText primary={dept.department} />
          </ListItem>
          <Collapse
            in={openDepartments[dept.department]}
            timeout="auto"
            unmountOnExit
          >
            <List component="div">
              {dept.sub_departments.map((subDept) => (
                <ListItem
                  key={subDept}
                  style={{ backgroundColor: "antiquewhite" }}
                >
                  <Checkbox
                    checked={selectedSubDepartments.includes(subDept)}
                    onChange={(e) =>
                      handleSubDepartmentSelect(
                        e.target.checked,
                        subDept,
                        dept.department
                      )
                    }
                  />
                  <ListItemText primary={subDept} />
                </ListItem>
              ))}
            </List>
          </Collapse>
        </div>
      ))}
    </List>
  );
};

export default DepartmentList;
