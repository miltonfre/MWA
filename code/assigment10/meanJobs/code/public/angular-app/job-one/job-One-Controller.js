angular.module("meanJobs").controller("jobOneController",jobOneController);

function jobOneController(jobDataFactory,$routeParams,$location){
    let vm=this;
    const jobId=$routeParams.id;
    vm.isSubmitted= false;
    vm.job='';
    jobDataFactory.getOneJob(jobId).then(function(response){
        vm.job=response;
    })

    vm.updateJob=function(){
        const newJob = {
            title: vm.job.title,
            salary: vm.job.salary,
            description: vm.job.description,
            experience: vm.job.experience,
            skills: vm.job.skills
        }
        if (vm.jobForm.$valid) {
            jobDataFactory.updateOneJob(vm.job._id,newJob).then(function (response) {
                $location.path("/jobs/");
            }).catch(function (er) {
                console.log(er);
            });
        }else{
            console.log("no valid");
            vm.isSubmitted= true;
        }
    }

    vm.reset = function () {
        $location.path("/jobs/");
    }
    vm.newSkill = function () {
        vm.job.skills.push('');
    }
    vm.delSkill = function (index) {
        vm.job.skills.splice(index, 1);
    }

    
}