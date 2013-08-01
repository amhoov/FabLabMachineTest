'use strict';

// Declare app level module with routes
var app = angular.module('fabLab', [], function($routeProvider) {
        $routeProvider.when('/',
            {
                templateUrl: 'partials/main.html',
                controller: MainCtrl
            });
            
        $routeProvider.when('/about',
            {
                templateUrl: 'partials/about.html'
            });
            
        $routeProvider.when('/:machine',
            {
                templateUrl: 'partials/details.html',
                controller: MachineCtrl
            });
            
        $routeProvider.otherwise(
            {
                redirectTo: '/'
            });
    });

function checkSubmit(){
    var machineViews = $('.machine-view'),

        numCorrect = 0,
        partsLength = 0,
        unfilledViews = 0,
        score = function(percent) {
            var bad = [':O', ':(', '(O.O)', 'ಠ╭╮ಠ', 'ರ_ರ', 'you should probably try again'],
                medium = ['maybe next time you\'ll get it'],
                good = [':)', '(^∇^)', '◕‿◕', '☺', 'very good!'],
                cssClass = '',
                scoreMessage = '';

            switch(true) {
            // [0, 70] is red
            case (percent >= 0 && percent <= 70):
                cssClass = 'text-error';
                scoreMessage = bad[Math.floor(Math.random() * bad.length)];
                break;
                
            // (70, 90) is yellow
            case (percent > 70 && percent < 90):
                cssClass = 'text-warning';
                scoreMessage = medium[Math.floor(Math.random() * medium.length)];
                break;
                
            // [90, 100] is green
            default:
                cssClass = 'text-success';
                scoreMessage = good[Math.floor(Math.random() * good.length)];
            }

            return {"klass": cssClass, "message": scoreMessage};
        };
        
    if ($('.alert-error')) {
        $('.alert-error').remove();
    }

    machineViews.each(function(index){
        var self = $(this),
            parts = self.find('.part-group'),
            viewPartsLength = parts.length,
            filledviewPartsLength = parts.has('.ui-state-highlight').length,
            viewNumCorrect = 0,
            percent = 0,
            message1 = '<span class="text-error"><strong>Uh-oh!</strong> %msg%</span>',
            message2 = '<span class="text-error">%msg%</span>',
            scoreObj;

        if (filledviewPartsLength === 0) {
            unfilledViews += 1;
            self.find('.score').html(message1.replace('%msg%', 'You did not fill in any parts!'));
            return;
        } else if (filledviewPartsLength < viewPartsLength) {
            self.find('.score').html(message1.replace('%msg%', 'You forgot ' + (viewPartsLength - filledviewPartsLength) + ' part' + ((viewPartsLength - filledviewPartsLength) !== 1 ? 's' : '') + '!'));
            return;
        }

        parts.each(function(index) {
            var self = $(this);

            if (self.data('part-id') === self.children().data('part-id')) {
                viewNumCorrect += 1;
            }
        });

        numCorrect += viewNumCorrect;
        partsLength += viewPartsLength;

        percent = (viewNumCorrect / viewPartsLength) * 100;

        scoreObj = score(percent);

        // console.log(this, percent, scoreMessage);

        if (machineViews.length > 1) {
            self.find('.score').html(message2.replace(/text-[a-z]+/, scoreObj.klass).replace('%msg%', 'You got ' + viewNumCorrect + ' out of ' + viewPartsLength + ' correct, that\'s ' + percent.toFixed(2) + '%... ' + scoreObj.message));
        }
    
        if (index === machineViews.length - 1 && unfilledViews === 0) {
            scoreObj = score(numCorrect / partsLength * 100);
            $('#check-parts').find('.score').html(message2.replace(/text-[a-z]+/, scoreObj.klass).replace('%msg%', '<strong>Total:</strong> You got ' + numCorrect + ' out of ' + partsLength + ' correct, that\'s ' + ((numCorrect / partsLength) * 100).toFixed(2) + '%... ' + scoreObj.message));
        }
    });

/*
    if (filledviewPartsLength < viewPartsLength) {
        //Fill in the number of unfilled parts and add an 's' if the number is not 1
        partAlert = $(alert.replace('#', ).replace('$', (viewPartsLength - filledviewPartsLength) !== 1 ? 's' : ''));
        
        $('.details').prepend(partAlert);
        return;
    }
        
    for (var i = 0, currPart; i < viewPartsLength; i++) {
        currPart = parts.eq(i);
        
        if (currPart.data('part-id') === currPart.children().eq(0).data('part-id')) {
            viewNumCorrect++;
        }
    }
    
    percent = (viewNumCorrect / viewPartsLength) * 100;
    
    switch(true) {
    // [0, 70] is red
    case (percent >= 0 && percent <= 70):
        cssClass = 'text-error';
        message = bad[Math.floor(Math.random() * bad.length)];
        break;
        
    // (70, 90) is yellow
    case (percent > 70 && percent < 90):
        cssClass = 'text-warning';
        message = medium[Math.floor(Math.random() * medium.length)];
        break;
        
    // [90, 100] is green
    default:
        cssClass = 'text-success';
        message = good[Math.floor(Math.random() * good.length)];
    }
    
    //console.log('correct:', viewNumCorrect, 'total:', viewPartsLength);

    $('#check-parts').find('.score').removeClass().addClass('score ' + cssClass).html('You got ' + viewNumCorrect + ' out of ' + viewPartsLength + ' correct, that\'s ' + percent.toFixed(2) + '%... ' + message);
*/

}

function resetParts() {
    var partsList = $('.parts-list'),
        partDrops = $('.part-drop');
        
    if ($('.alert-error')) {
        $('.alert-error').remove();
    }
    
    $('#check-parts').find('.score').html('').removeClass().addClass('score');
    
    partsList.children().each(function(){
        $(this).data('dropped', false).draggable('enable').removeClass('ui-state-disabled');
    });
    
    partDrops.each(function(){
        $(this).removeData('part-id').text('').removeClass('ui-state-highlight');
    });
    
    //console.log('machine reset!');
}

