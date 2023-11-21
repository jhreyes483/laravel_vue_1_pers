<?php

namespace App\Http\Controllers\Blog;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Blog;

class BlogController extends Controller
{

    public function __construct()
    {
        parent::__construct();
    }


    public function index()
    {
        $blogs =Blog::all();
        $response = [
            'blogs' =>$blogs
        ];
        return $this->responseApi->response(true, ['type' => 'success', 'content' => 'Done'],   $response );

    }


    public function create()
    {
        //
    }


    public function store(Request $request)
    {
        $blog = Blog::create($request->post());
        $response = [
            'blog' =>$blog
        ];
        return $this->responseApi->response(true, ['type' => 'success', 'content' => 'Done'],   $response );
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Blog $blog)
    {
        $response = [
            'blog' => $blog
        ];
        return $this->responseApi->response(true, ['type' => 'success', 'content' => 'Done'],   $response );
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Blog $blog)
    {
     
        $blog->fill($request->post())->save();
        $response = [
            'blog' => $blog
        ];
        $response['msg'] = 'actualizo producto';
        return $this->responseApi->response(true, ['type' => 'success', 'content' => 'Done'],   $response );

    }


    public function destroy(Blog $blog)
    {
        $blog->delete();   
        return $this->responseApi->response(true, ['type' => 'success', 'content' => 'Done'],   ['msg'=>'se elimino porducto'] );

    }
}
