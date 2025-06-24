import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { RouterAddCategories } from "@/helper/RouteName";
import React from "react";
import { Link } from "react-router-dom";


const CategoriesDetails = () => {
  return (
    <div>
      <Card>
        <CardHeader>
          <div>
            <Button asChild>
              <Link to={RouterAddCategories}>Add Categories</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
    </div>
  );
};

export default CategoriesDetails;
