angular.module("meanJobs").directive("jobSkills", jobSkills);

function jobSkills() {
    return {
        templateUrl:"angular-app/skills-directive/skills.html",
        bindCToController:true,
        controller:"jobsController",
         controllerAs:"vm",
        restrict:"E",
       // transclude: true,
        //replace: true
         scope:{
            skills:"@"
         }
    }
}