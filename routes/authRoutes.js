const passport = require('passport');
const express = require('express');
const mongoose = require('mongoose');
const User = mongoose.model('user');
const app = express();

module.exports = app => {
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email']
    })
    );

    app.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
        res.redirect('/dashboard');
    });

    app.get('/api/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });

    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });

    app.post('/api/addToDatabase', (req, res) => {
        //console.log(req.body)
        User.findById(req.user._id, function (err, user) {
            user.sessions.push(req.body);
            user.totalSubjects = user.sessions.length;
            user.save();
        })
        res.end();
    });

    app.post('/api/removeItem', (req, res) => {
        console.log(req.body);
        User.findById(req.user._id, function (err, user) {
            user.sessions = user.sessions.filter(item => {
                return item.itemID !== req.body.itemID
            });
            user.totalSubjects = user.sessions.length;
            if (req.body.complete)
                user.totalSubjectsCompleted = user.totalSubjectsCompleted - 1;

            console.log(user.totalSubjects, user.totalSubjectsCompleted);
            user.save();
        })
        res.end();
    });

    app.post('/api/setGoal', (req, res) => {

        User.findById(req.user._id, function (err, user) {
            user.goalSessionNumber = req.body.goalSet;
            user.attempedGoalNumber = 0;
            user.save();
        })
        res.end();
    });

    app.post('/api/updateSubject', (req, res) => {
        User.findById(req.user._id, function (err, user) {
            const filterArr = user.sessions.filter(item => item.itemID !== req.body.itemID);
            //console.log(filterArr);
            const updatedSubject = {
                date: req.body.date,
                subject: req.body.subject,
                minutes: req.body.minutes,
                itemID: req.body.itemID,
                complete: true
            }

            filterArr.push(updatedSubject);
            user.sessions = filterArr;
            //console.log(user.totalSubjectsCompleted);
            if (user.totalSubjectsCompleted)
                user.totalSubjectsCompleted++;
            else
                user.totalSubjectsCompleted = 1;

            if (user.goalSessionNumber && user.goalSessionNumber !== user.attempedGoalNumber) {
                if (user.attempedGoalNumber)
                    user.attempedGoalNumber++;
                else
                    user.attempedGoalNumber = 1;
            }

            user.save();
        })
        res.end();
    });
};