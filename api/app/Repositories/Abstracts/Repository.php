<?php namespace App\Repositories\Abstracts;

use App\Repositories\Contracts\RepositoryInterface;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Container\Container as App;

/**
 * Class Repository
 * @package Bosnadev\Repositories\Eloquent
 */
abstract class Repository implements RepositoryInterface {

	/**
	 * @var App
	 */
	private $app;

	/**
	 * @var
	 */
	protected $model;

	/**
	 * @param App $app
	 */
	public function __construct(App $app) {
		$this->app = $app;
		return $this->model = $app->make($this->model());
	}

	/**
	 * Specify Model class name
	 *
	 * @return mixed
	 */
	abstract function model();

	/**
	 * @param array $columns
	 * @return mixed
	 */
	public function all($columns = array('*'), $limit = null, $offset = null, $order_by = null, $filters = array(), $with = array()) {
		$query = $this->model;
		foreach($with as $join) {
			$query = $query->with($join);
		}
		$query = $this->setFilters($query, $filters);
		if($limit != null) {
			$query = $query->take($limit);
		}

		if($offset != null) {
			$query = $query->skip($offset);
		}

		if($order_by != null) {
			foreach($order_by as $column => $dir) {
				$query = $query->orderBy($column, $dir);
			}
		}
		return $query->get($columns);
	}

	public function total($filters = array()) {
		$query = $this->model;
		$query = $this->setFilters($query, $filters);
		return $query->count();
	}

	/**
	 * @param array $data
	 * @return mixed
	 */
	public function create(array $data) {
		$data = $this->setAttributtes($data);
		return $this->model->create($data);
	}

	/**
	 * @param array $data
	 * @param $id
	 * @param string $attribute
	 * @return mixed
	 */
	public function update(array $data, $id) {
		$data = $this->setAttributtes($data);
		return $this->model->find($id)->update($data);
	}

	/**
	 * @param $id
	 * @return mixed
	 */
	public function destroy($id) {
		return $this->model->destroy($id);
	}

	/**
	 * @param $id
	 * @param array $columns
	 * @return mixed
	 */
	public function find($id, $columns = array('*')) {
		return $this->model->find($id, $columns);
	}

	public function findWith($id, $columns = array('*'), $with = array()) {
		$query = $this->model;
		foreach($with as $join) {
			$query = $query->with($join);
		}
		return $query->find($id, $columns);
	}

	/**
	 * @param $attribute
	 * @param $value
	 * @param array $columns
	 * @return mixed
	 */
	public function findBy($attribute, $value, $columns = array('*'), $limit = null, $offset = null, $order_by = null) {
		$query = $this->model;
		if($limit != null) {
			$query = $query->take($limit);
		}

		if($offset != null) {
			$query = $query->skip($offset);
		}

		if($order_by != null) {
			foreach($order_by as $column => $dir) {
				$query = $query->orderBy($column, $dir);
			}
		}
		return $query->where($attribute, '=', $value)->get($columns);
	}

	public function setAttributtes(array $data)
	{
		$data = array_map(function($value) {
			return is_array($value) || is_object($value) ? $value : trim($value);
		}, $data);

		$data = array_filter($data, function($value) {
			return ($value !== null && $value !== '');
		});

		return $data;
	}

	public function setFilters($query, $filters)
	{
		return $query;
	}
}