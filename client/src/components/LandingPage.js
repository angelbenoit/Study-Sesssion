import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Events, animateScroll as scroll, scrollSpy } from 'react-scroll';
import * as actions from '../Actions';

class LandingPage extends Component {

    componentWillMount(){
        this.props.fetchUser();
    }

    //these two component functions will initialize the scrolling package
    componentDidMount() {
        Events.scrollEvent.register('begin', function (to, element) {
            console.log("begin", arguments);
        });

        Events.scrollEvent.register('end', function (to, element) {
            console.log("end", arguments);
        });
        scrollSpy.update();
    }

    componentWillUnmount() {
        Events.scrollEvent.remove('begin');
        Events.scrollEvent.remove('end');
    }

    getLoginOption(){
        if(!this.props.auth){
            return(
                <a className="redirectHomePage" href="/auth/google">
                    <i class="fa fa-google-plus"></i> &nbsp;Login
                </a>
            )
        }
        else{
            return(
                <NavLink className="redirectHomePage" to="/dashboard">
                    Go to dashboard
                </NavLink>
            )
        }
        //console.log(this.props.auth)
    }

    render() {
        return (
            <div className="landing-page">
                <div className="landing-page__header">
                    <div className="landing-page__header-text">
                        <h1><i class="fa fa-book"></i> Study Session</h1>
                        <p>
                            Study Session is a tracker for school subjects.
                            Users will be able to schedule school subjects
                            and the amount of minutes on and present or future
                            date. For these subjects to be marked complete, users
                            will need to start the countdown timer and study until
                            the timer stops.
                        </p>

                        {this.getLoginOption()}

                        <i
                            class="fa fa-arrow-circle-down landing-page__header-scroll"
                            onClick={() => scroll.scrollTo(800)}
                        >
                        </i>
                    </div>
                </div>

                <div className="landing-page__details">
                    <div className="landing-page__details-footerIntro">
                        <h1 style={{'textDecoration': 'underline'}}>Features</h1>
                        <div style={{"border-bottom": "2px solid #ABAEF7"}}></div>

                        <div className="feature_list">

                            <div className="feature_list-item">
                                <div className="feature_list-item-text">
                                    <h4>Schedule with our built in calendar</h4>
                                    <p>
                                        Using the calendar, users can schedule a study Session
                                        any day of the year.
                                    </p>
                                </div>
                                <img src={require("../images/calendar.png")} alt="Calendar"/>
                            </div>

                            <div style={{"border-bottom": "2px solid #ABAEF7"}}></div>

                            <div className="feature_list-item">
                                <div className="feature_list-item-text">
                                    <h4>Starting the timed study session</h4>
                                    <p>
                                        You can only access the study session they scheduled
                                        on that specific date. Just click on start session
                                        and you'll be able to see the remaining subjects needed
                                        to be completed. Once you start a session for a subject
                                        on a particular day, you will have to complete it without pausing.
                                        Once a session for a particular subject has been completed,
                                        it will be marked completed, and you will have the option to
                                        move on to start the next subject or just take a break.
                                    </p>
                                </div>
                                <img src={require("../images/timer.png")} alt="Timer"/>
                            </div>

                            <div style={{"border-bottom": "2px solid #ABAEF7"}}></div>

                            <div className="feature_list-item">
                                <div className="feature_list-item-text">
                                    <h4>User Dashboard</h4>
                                    <p>
                                        See your progress, like how many sessions you've completed.
                                        View past sessions and set goals.
                                    </p>
                                </div>
                                <img src={require("../images/dashboard.png")} alt="Dashboard"/>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="landing-page__footer">
                    <h3 className="landing-page__footer-item">Study Session</h3>
                    <a className="landing-page__footer-item" href="https://github.com/angelbenoit/Study-Sesssion">
                        <i class="fa fa-github"></i> View Project Source
                    </a>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, actions)(LandingPage);