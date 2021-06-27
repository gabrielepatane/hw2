<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('index');
});

Route::get('/login', 'LoginController@login')->name('login');

Route::post('/login', 'LoginController@checkLogin');

Route::get('/logout', 'LoginController@logout')->name('logout');

Route::get('/register', 'RegisterController@index')->name('register');

Route::post('/register', 'RegisterController@create');

Route::get('/register/username/{q}', 'RegisterController@checkUsername');

Route::get('/register/email/{q}', 'RegisterController@checkEmail');

Route::get('/home', 'HomeController@index')->name('home');

Route::get('/home/search/{q}', 'HomeController@search');

Route::get('/track-features/{q}', 'SongController@getTrackFeatures');

Route::get('/user-songs', 'SongController@getUserSongs');

Route::get('/get-progressions', 'SongController@getProgressions');

Route::post('/save-song', 'SongController@saveSong');

Route::post('/delete-song', 'SongController@deleteSong');

Route::post('/save-prog', 'SongController@saveProg');

Route::post('/update-prog', 'SongController@updateProg');

Route::post('/delete-prog', 'SongController@deleteProg');

Route::get('/profile', 'ProfileController@index')->name('profile');

Route::get('/profile-stats', 'ProfileController@getStats');
