<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\TypeEvent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CalendarController extends Controller
{

    public function getEventToDay(){

    }

    public function getTypeEvents(){
        $typeEvents = TypeEvent::select('id','name')->get();
        return['status'=>true, 'typeEvents' => $typeEvents];
    }

    public function save(Request $request){
        $event = new Event();
        $event->name = $request->name;
        $event->description = $request->description;
        $event->status = 1;
        $event->start =  $request->date.' '.$request->start;
        $event->end =  $request->date.' '.$request->end;
        $event->user_id  =  $request->selectedUser;
        $event->color  =  $request->color;
        $event->type_event_id = $request->selectedType;
        $event->save();
        return['status'=>true, 'event'=>$event, 'msg'=>'Creo nuevo evento'];
    }

    public function update(Request $request, $id){
        $event = Event::select('id',$id)->first();
        $event->name = $request->name;
        $event->description = $request->description;
        $event->status = 1;
        $event->start =  $request->date.' '.$request->start;
        $event->end =  $request->date.' '.$request->end;
        $event->user_id  =  $request->selectedUser;
        $event->color  =  $request->color;
        $event->type_event_id = $request->selectedType;
        $event->save();
        return['status'=>true, 'event'=>$event, 'msg'=>'Actualizo nuevo evento'];
    }

    public function delete(Request $request, $id){
        $event = Event::select('id',$id)->first();
        $event->delete();
    }

    public function getEvents(){
        $events = Event::with('Type')->where('user_id', Auth::id()?? 1)->get();
        return['status'=>true, 'events'=>$events];
    }




}
