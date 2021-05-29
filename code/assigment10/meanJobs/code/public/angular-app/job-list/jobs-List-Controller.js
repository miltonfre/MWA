angular.module("meanJobs").controller("jobsController", jobsController);

function jobsController(jobDataFactory,$location) {
    let vm = this;
    vm.visibleNewJobForm = false;
    vm.offset = 0;
    vm.count = 5;
    vm.title = "MEAN Jobs app";
    vm.objSkill = '';
    vm.isSubmitted= false;

    vm.newSkill = function () {
        vm.newJobSkills.push(vm.objSkill);
    }
    vm.delSkill = function (index) {
        vm.newJobSkills.splice(index, 1);
    }

    jobDataFactory.getAllJobs(vm.offset, vm.count).then(function (response) {
        vm.jobs = response;
    });

    vm.findJobs = function () {
        vm.visibleNewJobForm = false;
        jobDataFactory.getAllJobs(vm.offset, vm.count).then(function (response) {
            console.log(response);
            vm.jobs = response;
        });
    }
    vm.showNewJob = function () {
        vm.newJobSkills = [];
        vm.visibleNewJobForm = true;
    }

    vm.reset = function () {
        vm.visibleNewJobForm = false;
        vm.newJobTitle = '';
        vm.newJobSalary = '';
        vm.newJobDescription = '';
        vm.newJobExperience = '';
        vm.newJobSkills = [];
    }
    vm.addJob = function () {
        const newJob = {
            title: vm.newJobTitle,
            salary: vm.newJobSalary,
            description: vm.newJobDescription,
            experience: vm.newJobExperience,
            skills: vm.newJobSkills
        }
        if (vm.jobForm.$valid) {
            jobDataFactory.addOneJob(newJob).then(function (response) {
                console.log("job created", response);
                vm.findJobs();
            }).catch(function (er) {
                console.log(er);
            });
        }else{
            vm.isSubmitted= true;
        }
    }
    vm.deleteOneJob=function(jobId){
        if(confirm("Are you sure to delete")) {
            jobDataFactory.deleteOneJob(jobId).then(function (response) {
                console.log("job deleted",response);
                vm.findJobs();
            }).catch(function(er){
                console.log(er);
            });
        }
    }

    vm.editOneJob=function(jobId){
        $location.path("/jobs/"+jobId);
    }

    vm.nextPage = function () {
        vm.offset = vm.offset + 1;
        vm.findJobs();
    }
    vm.beforePage = function () {
        vm.offset = vm.offset - 1;
        vm.findJobs();
    }
}